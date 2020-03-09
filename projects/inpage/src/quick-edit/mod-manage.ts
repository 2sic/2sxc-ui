import { data } from './clipboard';
import { $quickE as quickE } from './quick-e';

/**
 * module specific stuff
 */
export class ModManage {
  delete = deleteMod;
  create = createModWithTypeName;
  move = moveMod;
  getPaneName = getPaneName;
  getModuleId = getModuleId;
  getMoveButtons = generatePaneMoveButtons;
}

export const modManage = new ModManage();

function getPaneName(pane: string): any {
  return $(pane).attr('id').replace('dnn_', '');
}

// find the correct module id from a list of classes - used on the module-wrapper
function getModuleId(classes: string): number | null {
  const result = classes.match(/DnnModule-([0-9]+)(?:\W|$)/);
  return (result && result.length === 2) ? Number(result[1]) : null;
}

// show an error when an xhr error occurs
function xhrError(xhr: any, optionalMessage: string): void {
  alert(optionalMessage || 'Error while talking to server.');
  console.log(xhr);
}

// service calls we'll need
function createModWithTypeName(paneName: string, index: number, type: string): any {
  return sendDnnAjax(null,
    'controlbar/GetPortalDesktopModules',
    {
      data: 'category=All&loadingStartIndex=0&loadingPageSize=100&searchTerm=',
      success: (desktopModules: any) => {
        const moduleToFind: string = type === 'Default' ? ' Content' : ' App';
        let module: any = null;

        // ReSharper disable once UnusedParameter
        desktopModules.forEach((e: any, i: any) => {
          if (e.ModuleName === moduleToFind)
            module = e;
        });

        return (!module)
          ? alert(moduleToFind + ' module not found.')
          : createMod(paneName, index, module.ModuleID);
      },
    });
}

// move a dnn module
function moveMod(modId: number, pane: string, order: number): any {
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
    'ModuleService/MoveModule',
    {
      type: 'POST',
      data: dataVar,
      success: () => window.location.reload(),
    });

  // fire window resize to reposition action menus
  $(window).resize();
}

// delete a module
function deleteMod(modId: number): any {
  const service: any = $.dnnSF(modId);
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
      success: (d: any) => window.location.reload(),
    });
}

// call an api on dnn
function sendDnnAjax(modId: number, serviceName: string, options: any): any {
  const service: any = $.dnnSF(modId);

  return $.ajax($.extend({
    type: 'GET',
    url: service.getServiceRoot('internalservices') + serviceName,
    beforeSend: service.setModuleHeaders,
    error: xhrError,
  },
    options));
}

// create / insert a new module
function createMod(paneName: string, position: number, modId: number): any {
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
    'controlbar/AddModule',
    {
      type: 'POST',
      data: postData,
      // ReSharper disable once UnusedParameter
      success: (d: any) => window.location.reload(),
    });
}


function generatePaneMoveButtons(current: string): any {
  const pns: any = quickE.cachedPanes;
  // generate list of panes as links
  const targets: any = $('<div>');
  for (let p = 0; p < pns.length; p++) {
    const pName: string = getPaneName(pns[p]);
    const selected: string = (current === pName) ? ' selected ' : '';
    if (selected === '')
      targets.append(`<a data='${pName}'>${pName}</a>`);
  }

  // attach click event...
  // ReSharper disable once UnusedParameter
  targets.find('a').click(function (d: any) {
    const link = $(this);
    const clip = data;
    const modId = getModuleId(clip.item.className);
    const newPane = link.attr('data');

    moveMod(modId, newPane, 0);
  });

  return targets;
}
