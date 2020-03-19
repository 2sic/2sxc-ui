import { Actions } from './content-list-actions';
import { translate } from '../../translate/2sxc.translate';
import { Commands } from '../commands';

/**
 * todo: shouldn't be available if changes are not allowed
 *
 * import this module to commands.ts
 */
Commands.add('publish', 'Unpublished', 'eye-off', false, false, {
    showCondition(context) {
        return context.button.action.params.isPublished === false;
    },
    disabled(context) {
        console.log('disabled:', context.instance);
        return !context.instance.allowPublish;
    },
    code(context, event): Promise<void> {
        return new Promise((resolve, reject) => {
            if (context.button.action.params.isPublished) {
                alert(translate('Toolbar.AlreadyPublished'));
                return resolve();
            }

            // if we have an entity-id, publish based on that
            if (context.button.action.params.entityId) {
                return Actions.publishId(
                    context,
                    context.button.action.params.entityId,
                );
            }

            const part: string =
                context.button.action.params.sortOrder === -1
                    ? 'listcontent'
                    : 'content';
            const index =
                context.button.action.params.sortOrder === -1
                    ? 0
                    : context.button.action.params.sortOrder;
            return Actions.publish(context, part, index);
        });
    },
});
