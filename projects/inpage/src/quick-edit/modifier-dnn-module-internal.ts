import { ModifierDnnModule, QuickE, QuickEClipboard } from '.';
import { HasLog, NoJQ } from '../logging';

// Important - for DNN it still uses #jquery
const dnnSF = (id?: number) => window.$.dnnSF(id);

/**
 * module specific stuff
 * @internal
 */
export class ModifierDnnModuleInternal extends HasLog {

    constructor(parent: ModifierDnnModule) {
        super('QE.ModMng', parent.log);
    }

    /**
     * Delete a module
     */
    delete(modId: number): Promise<any> {
        const service = dnnSF(modId);
        const tabId: number = service.getTabId();
        return sendDnnAjax({
            modId,
            url: dnnSF().getServiceRoot('2sxc') + 'dnn/module/delete',
            method: 'GET',
            data: {
                tabId: tabId,
                modId: modId,
            },
            // ReSharper disable once UnusedParameter
            success: () => window.location.reload(),
        });
    }

    /**
     * Create a new module
     */
    create(paneName: string, index: number, type: string): Promise<any> {
        return sendDnnAjax({
            modId: null,
            url: dnnSF().getServiceRoot('internalservices') + 'controlbar/GetPortalDesktopModules',
            method: 'GET',
            data: 'category=All&loadingStartIndex=0&loadingPageSize=100&searchTerm=',
            success: (desktopModules: ModuleInfo[]) => {
                const moduleToFind: string = type === 'Default' ? ' Content' : ' App';
                let module: ModuleInfo = null;

                // ReSharper disable once UnusedParameter
                desktopModules.forEach((e, i: number) => {
                    if (e.ModuleName === moduleToFind)
                        module = e;
                });

                return (!module)
                    ? alert(moduleToFind + ' module not found.')
                    : createMod(paneName, index, module.ModuleID);
            },
        });
    }

    /**
     * Move a DNN Module
     */
    move(modId: number, pane: string, order: number): void {
        const service = dnnSF(modId);
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

        sendDnnAjax({
            modId,
            url: dnnSF(modId).getServiceRoot('internalservices') + 'ModuleService/MoveModule',
            method: 'POST',
            data: dataVar,
            success: () => window.location.reload(),
        });
    }

    getPaneName(pane: HTMLElement): string {
        return pane.getAttribute('id').replace('dnn_', '');
    }

    /**
     * find the correct module id from a list of classes - used on the module-wrapper
     */
    getModuleId(classes: string): number | null {
        const result = classes.match(/DnnModule-([0-9]+)(?:\W|$)/);
        return (result && result.length === 2) ? Number(result[1]) : null;
    }

    getMoveButtons(current: string): HTMLElement {
        const pns = QuickE.singleton().cachedPanes;
        // generate list of panes as links
        const targets = NoJQ.domFromString('<div></div>')[0];
        for (let p = 0; p < pns.length; p++) {
            const pName: string = this.getPaneName(pns[p]);
            const selected: string = (current === pName) ? ' selected ' : '';
            if (selected === '') {
                const target = NoJQ.domFromString(`<a data='${pName}'>${pName}</a>`)[0];
                targets.append(target);
            }
        }

        // attach click event...
        const _this = this;
        targets.querySelectorAll<HTMLElement>('a').forEach((e) => {
            e.addEventListener('click', function () {
                const link = this;
                const clip = QuickEClipboard.singleton().clipboard;
                const modId = _this.getModuleId(clip.item.className);
                const newPane = link.getAttribute('data');
                _this.move(modId, newPane, 0);
            });
        });

        return targets;
    }
}

// call an api on dnn
function sendDnnAjax(req: DnnHttpRequest): Promise<any> {
    // set DNN headers
    const dnnHeaders: Record<string, string> = {};
    const fakeXhr = {
        setRequestHeader(name: string, value: string) {
            dnnHeaders[name] = value;
        },
    } as JQueryXHR;
    dnnSF(req.modId).setModuleHeaders(fakeXhr);

    const settings: RequestInit = {
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            ...dnnHeaders,
        },
        method: req.method,
    };
    let url = req.url;
    if (req.data) {
        switch (req.method) {
            case 'GET':
                url += typeof req.data === 'string' ? `?${req.data}` : `?${NoJQ.param(req.data)}`;
                break;
            case 'POST':
                settings.body = new URLSearchParams(NoJQ.param(req.data));
                (settings.headers as Record<string, string>)['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
                break;
        }
    }

    const success = req.success;
    return fetch(url, settings)
        .then((response) => {
            if (response.status >= 200 && response.status < 300) {
                return response.text();
            }
            throw new Error(response.statusText);
        })
        .then((resText) => {
            let resData: any;
            try {
                resData = JSON.parse(resText);
            } catch {
                resData = resText;
            }
            success?.(resData);
            return resData;
        })
        .catch((err: Error) => {
            alert(`Error while talking to server: ${err.message}`);
            return undefined;
        });
}

// create / insert a new module
function createMod(paneName: string, position: number, modId: number): Promise<any> {
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
    return sendDnnAjax({
        modId: null,
        url: dnnSF().getServiceRoot('internalservices') + 'controlbar/AddModule',
        method: 'POST',
        data: postData,
        success: () => window.location.reload(),
    });
}

interface ModuleInfo {
    ModuleName: string;
    ModuleID: number;
}

interface DnnHttpRequest {
    modId: number;
    url: string;
    method: 'GET' | 'POST';
    data?: Record<string, any> | string;
    success?: (data: any) => void;
}
