import { CommandNames } from '../../../../$2sxc/src/cms/command-names';
import { Log } from '../../../../core/logging/Log';
import { insightsUrl } from '../../commands/command/command-insights';
import { ContextProblems } from '../../context/html-attribute/parts/error';
import { BuildRule } from './rule';

const thingPlaceholder = 'thing-to-replace';

// https://fonts.google.com/icons?selected=Material+Symbols+Outlined:bug_report:FILL@0;wght@0;GRAD@0;opsz@NaN&icon.set=Material+Symbols&icon.query=bug
const iconBug = '<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M480-120q-65 0-121-31t-83-89H160v-60h92q-7-26-7-52.5V-406h-86v-60h86q0-29 .5-57.5T254-580h-94v-60h120q14-28 37-49t51-35l-77-76 40-40 94 94q28-10 56.5-10t56.5 10l94-94 40 40-76 76q28 14 49.5 35.5T683-640h118v60h-95q9 28 8.5 56.5T714-466h87v60h-87q0 27 .5 53.5T708-300h93v60H685q-26 59-82.5 89.5T480-120Zm0-60q72 0 123-50.5T654-353v-167q0-72-51-122.5T480-693q-72 0-123 50.5T306-520v167q0 72 51 122.5T480-180Zm-80-140h160v-60H400v60Zm0-173h160v-60H400v60Zm80 57h.5-.5.5-.5.5-.5.5-.5Z"/></svg>';

// const iconRip = '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M368 432V192c0-79.5-64.5-144-144-144S80 112.5 80 192V432H32V192C32 86 118 0 224 0S416 86 416 192V432H368zM0 488c0-13.3 10.7-24 24-24H424c13.3 0 24 10.7 24 24s-10.7 24-24 24H24c-13.3 0-24-10.7-24-24zM248 152v40h48c13.3 0 24 10.7 24 24s-10.7 24-24 24H248V360c0 13.3-10.7 24-24 24s-24-10.7-24-24V240H152c-13.3 0-24-10.7-24-24s10.7-24 24-24h48V152c0-13.3 10.7-24 24-24s24 10.7 24 24z"/></svg>';

const ripButton = { // ToolbarButtonSettings & Partial<ToolbarSettings> = {
  color: 'orange',
  icon: iconBug,
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