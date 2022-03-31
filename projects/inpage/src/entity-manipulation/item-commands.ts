import { ContextComplete } from '../context/bundles/context-bundle-button';
import { translate } from '../i18n';

/**
 * this enhances the $2sxc client controller with stuff only needed when logged in
 */

// #region contentItem Commands
export let contentItems = {
  // delete command - try to really delete a content-item
  delete: (context: ContextComplete, itemId: number, itemGuid: string, itemTitle: string): Promise<void> => {
    // first show main warning / get ok
    const ok = confirm(translate('Delete.Confirm')
      .replace('{id}', String(itemId))
      .replace('{title}', itemTitle));

    if (!ok) return Promise.resolve();

    /**
     * ZoneId and AppId are sent becase of rare, special case that is not default
     * (default is that 2sxc is finding ZoneId and AppId on server side from ModuleId)
     * when we need to delete entity from other app or zone, than current one.
     * TODO: send this params, only when is necesary (value change detection for ZoneId, AppId)
     */
    const params = {
      zoneId: context.app.zoneId,
      appId: context.app.id,
    };

    return context.sxc.webApi.fetchRaw(context.sxc.webApi.url(`app/auto/content/any/${itemGuid}`, params), undefined, 'DELETE')
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          location.reload();
        } else if (response.status >= 400 && response.status < 500) {
          // check if it's a permission config problem
          const msgJs = translate('Delete.ErrCheckConsole');
          if (response.status === 401) alert(translate('Delete.ErrPermission') + msgJs);
          if (response.status === 400) alert(translate('Delete.ErrInUse') + msgJs);
        }
      }).catch((error) => {
        console.log(error);
      });
  },
};

