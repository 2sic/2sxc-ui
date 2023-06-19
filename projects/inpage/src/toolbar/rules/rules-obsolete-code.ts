import { CommandNames } from '../../../../$2sxc/src/cms/command-names';
import { Log } from '../../../../core/logging/Log';
import { insightsUrl } from '../../commands/command/command-insights';
import { ContextProblems } from '../../context/html-attribute/parts/error';
import { BuildRule } from './rule';

const thingPlaceholder = 'thing-to-replace';
const ripButton = { // ToolbarButtonSettings & Partial<ToolbarSettings> = {
  color: 'orange',
  icon: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M368 432V192c0-79.5-64.5-144-144-144S80 112.5 80 192V432H32V192C32 86 118 0 224 0S416 86 416 192V432H368zM0 488c0-13.3 10.7-24 24-24H424c13.3 0 24 10.7 24 24s-10.7 24-24 24H24c-13.3 0-24-10.7-24-24zM248 152v40h48c13.3 0 24 10.7 24 24s-10.7 24-24 24H248V360c0 13.3-10.7 24-24 24s-24-10.7-24-24V240H152c-13.3 0-24-10.7-24-24s10.7-24 24-24h48V152c0-13.3 10.7-24 24-24s24 10.7 24 24z"/></svg>',
  note: {
    note: `<strong>Obsolete Code detected in this ${thingPlaceholder}</strong>
    <br>
    This uses obsolete code which will be removed soon. You should fix the code so it won't break on a future update.`,
    allowHtml: true,
  },
}

const codeObsolete = 'obsolete';
const appCodeObsolete = 'obsolete-app';


/**
 * Add buttons to warn about obsolete code
 */
export function addStandardObsoleteButtons(log: Log, problems: ContextProblems[], appId: number)
  : [ContextProblems[], BuildRule[]] {
  // If any of the problems report 'obsolete'
  // add a special button and then skip those problems
  var rules: BuildRule[] = [];
  if (problems.find(p => p.code === codeObsolete) !== undefined)
    rules.push(createButtonForObsolete(log, appId, 'Razor', 'red'));
  else if (problems.find(p => p.code === appCodeObsolete) !== undefined)
    rules.push(createButtonForObsolete(log, appId, 'App', null));

  const remaining = problems.filter(p => p.code !== codeObsolete && p.code != appCodeObsolete);
  return [ remaining, rules ];
}

function createButtonForObsolete(log: Log, appId: number, thing: string, color: string) {
  return BuildRule.Create({
    name: CommandNames.insights,
    ui: {
      ...ripButton,
      color: color ?? ripButton.color,
      note: {
        ...ripButton.note,
        links: [
          { 
            url: insightsUrl(`logs?key=warnings-obsolete&filter=AppId=${appId}`),
            label: 'Obsolete this App',
            primary: true
          },
          { 
            url: insightsUrl('logs?key=warnings-obsolete'),
            label: 'all obsolete',
            primary: false
          }
        ],
        note: ripButton.note.note.replace(thingPlaceholder, thing),
      }
    },
    params: { part: 'Logs?&key=warnings-obsolete'},
    pos: 11,
    log: log
  });
}