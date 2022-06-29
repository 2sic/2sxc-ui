import { CmdParHlp, CommandNames, Commands } from '..';
import { translate } from '../../i18n';
import { Actions } from './content-list-actions';

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
    return !context.instance.allowPublish || context.button.command.params.isPublished !== false;
  },
  code(context, event): Promise<void> {
    const params = context.button.command.params;
    return new Promise((resolve, reject) => {
      if (params.isPublished) {
        alert(translate('Toolbar.AlreadyPublished'));
        return resolve();
      }

      // if we have an entity-id, publish based on that
      if (params.entityId)
        return Actions.publishId(context, params.entityId);

      const i = CmdParHlp.getIndex(context);
      const part: string = i === -1 ? 'listcontent' : 'content';
      const index = i === -1 ? 0 : i;
      return Actions.publish(context, part, index);
    });
  },
});
