import { Actions } from './content-list-actions';
import { CommandNames, Commands } from '..';
import { translate } from '../../i18n';

/**
 * todo: shouldn't be available if changes are not allowed
 *
 * import this module to commands.ts
 * @internal
 */
Commands.add(CommandNames.publish, 'Unpublished', 'eye-off', false, false, {
    showCondition(context) {
        return context.button.command.params.isPublished === false;
    },
    disabled(context) {
        return !context.instance.allowPublish;
    },
    code(context, event): Promise<void> {
        return new Promise((resolve, reject) => {
            if (context.button.command.params.isPublished) {
                alert(translate('Toolbar.AlreadyPublished'));
                return resolve();
            }

            // if we have an entity-id, publish based on that
            if (context.button.command.params.entityId) {
                return Actions.publishId(
                    context,
                    context.button.command.params.entityId,
                );
            }

            const part: string =
                context.button.command.params.sortOrder === -1
                    ? 'listcontent'
                    : 'content';
            const index =
                context.button.command.params.sortOrder === -1
                    ? 0
                    : context.button.command.params.sortOrder;
            return Actions.publish(context, part, index);
        });
    },
});
