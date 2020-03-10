import { data } from './clipboard';
import { $quickE as quickE } from './quick-e';

/**
 * module specific stuff
 */
export class ModManage {

  /**
   * Delete a module
   */
  delete(modId: number): JQueryXHR {
    const service = $.dnnSF(modId);
    const tabId: number = service.getTabId();
    return sendDnnAjax(modId,
      '2sxc/dnn/module/delete',
      {
        url: $.dnnSF().getServiceRoot('2sxc') + 'dnn/module/delete',
        type: 'GET',
        data: {
          tabId: tabId,
          modId: modId,
        },
        // ReSharper disable once UnusedParameter
        success: () => window.location.reload(),
      } as Partial<JQueryAjaxSettings>);
  }

  /**
   * Create a new module
   */
  create(paneName: string, index: number, type: string): JQueryXHR {
    return sendDnnAjax(null,
      'controlbar/GetPortalDesktopModules',
      {
        data: 'category=All&loadingStartIndex=0&loadingPageSize=100&searchTerm=',
        success: (desktopModules) => {
          const moduleToFind: string = type === 'Default' ? ' Content' : ' App';
          let module: any = null;

          // ReSharper disable once UnusedParameter
          desktopModules.forEach((e: any, i: number) => {
            if (e.ModuleName === moduleToFind)
              module = e;
          });

          return (!module)
            ? alert(moduleToFind + ' module not found.')
            : createMod(paneName, index, module.ModuleID);
        },
      } as Partial<JQueryAjaxSettings>);
  }

  /**
   * Move a DNN Module
   */
  move(modId: number, pane: string, order: number): void {
    const service = $.dnnSF(modId);
    const tabId = service.getTabId();
    const dataVar = {
      TabId: tabId,
      ModuleId: modId,
      Pane: pane,
      ModuleOrder: (2 * order + 0),
      // strange formula, copied from DNN https://github.com/dnnsoftware/Dnn.Platform/blob/fd225b8de07042837f7473cd49fba13de42a3cc0/Website/admin/Menus/ModuleActions/ModuleActions.js#L70
      // stv: changed formula from: (2 * order + 4)
      // ...to: (2 * order + 0)
    };

    sendDnnAjax(modId,
      'ModuleService/MoveModule', {
        type: 'POST',
        data: dataVar,
        success: () => window.location.reload(),
      } as Partial<JQueryAjaxSettings>);

    // fire window resize to reposition action menus
    $(window).resize();
  }

  getPaneName(pane: HTMLElement | JQuery): string {
    return $(pane).attr('id').replace('dnn_', '');
  }

  /**
   * find the correct module id from a list of classes - used on the module-wrapper
   */
  getModuleId(classes: string): number | null {
    const result = classes.match(/DnnModule-([0-9]+)(?:\W|$)/);
    return (result && result.length === 2) ? Number(result[1]) : null;
  }

  getMoveButtons(current: string): JQuery {
    const pns = quickE.cachedPanes;
    // generate list of panes as links
    const targets = $('<div>');
    for (let p = 0; p < pns.length; p++) {
      const pName: string = this.getPaneName(pns[p]);
      const selected: string = (current === pName) ? ' selected ' : '';
      if (selected === '')
        targets.append(`<a data='${pName}'>${pName}</a>`);
    }

    // attach click event...
    // ReSharper disable once UnusedParameter
    targets.find('a').click(function() {
      const link = $(this);
      const clip = data;
      const modId = this.getModuleId(clip.item.className);
      const newPane = link.attr('data');

      this.moveMod(modId, newPane, 0);
    });

    return targets;
  }
}

export const modManage = new ModManage();

// show an error when an xhr error occurs
function xhrError(xhr: JQueryXHR, optionalMessage: string): void {
  alert(optionalMessage || 'Error while talking to server.');
  console.log(xhr);
}

// call an api on dnn
function sendDnnAjax(modId: number, serviceName: string, options: Partial<JQueryAjaxSettings>): JQueryXHR {
  const service = $.dnnSF(modId);

  return $.ajax($.extend({
    type: 'GET',
    url: service.getServiceRoot('internalservices') + serviceName,
    beforeSend: service.setModuleHeaders,
    error: xhrError,
  }  as Partial<JQueryAjaxSettings>,
    options));
}

// create / insert a new module
function createMod(paneName: string, position: number, modId: number): JQueryXHR {
  const postData = {
    Module: modId,
    Page: '',
    Pane: paneName,
    Position: -1,
    Sort: position,
    Visibility: 0,
    AddExistingModule: false,
    CopyModule: false,
  };
  return sendDnnAjax(null,
    'controlbar/AddModule', {
      type: 'POST',
      data: postData,
      // ReSharper disable once UnusedParameter
      success: () => window.location.reload(),
    } as Partial<JQueryAjaxSettings>);
}
