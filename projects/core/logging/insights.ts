import { HasLog, Log } from '.';

declare const window: Window;

type LogList = Array<{ key: string, log: Log}>;

const msgIntro = 'This is the $2sxc JS Insights - see https://r.2sxc.org/insights \n'
    + 'Add ?debug=true to the url to log more data. \n'
    + 'Copy/paste code lines below to see details. \n'
    + '----------------------------------------------------------------------\n';

class InsightsSingleton extends HasLog {

    constructor() {
        super('Sys.Insght');
        this.add('system', 'insights', this.log);
        this.log.add(`this log is usually empty, as it's just a helper tool`)
    }

    history: { [key: string]: InsightsLogSet } = {};

    add(setName: string, logName: string, log: Log ) {
        if (!(setName in this.history))
            this.history[setName] = new InsightsLogSet(setName);
        this.history[setName].logs.push({key: logName, log: log});
    }

    show(partName: string, index?: number, start?: number, length?: number): void {
        // if nothing specified, list what to do to see inner parts
        if (!partName) {
            const keys = Object.keys(this.history);
            console.log(`${msgIntro}${keys.length} insights-sections found: \n` + keys.map((p) => `$2sxc.insights('${p}');`).join('\n'));
            return;
        }

        // partName found, check if it exists
        const part = this.history[partName];
        if (!part) {
            console.error(`part '${partName}' not found`);
            return;
        }

        // We have a partName, but no index - show list and how to get details
        if (index === undefined) {
            let count = 0;
            const logNames = part.logs
                .map((s) => `$2sxc.insights('${partName}', ${count++}); - will show for '${s.key}'`)
                .join('\n');
            console.log(`'${partName}' contains ${part.logs.length} entries. Copy/paste the code to to see the logs: \n` + logNames);
            return;
        }

        // verify the entry exists
        const logSet = part.logs.length >= index && part.logs[index];
        if (!logSet) {
            console.error(`index ${index} not found in part '${partName}'`);
            return;
        }

        if (!logSet.log) {
            console.error(`found index ${index} on part '${partName}' but it has no logs`);
            return;
        }

        console.log(`Will dump the log for ${partName}[${index}] '${logSet.key}'`);
        let autoLimit = false;
        if (start === undefined) {
            autoLimit = true;
            start = 0;
            length = 25;
        }
        logSet.log.dumpList(start || 0, length);
        if (autoLimit && logSet.log.entries.length > length)
            console.warn(`Only showing ${length} of ${logSet.log.entries.length} logs. To show all, add start param '..., 0)' or start/length '..., 0, 100)'`)
}
}

// tslint:disable-next-line: max-classes-per-file
class InsightsLogSet {
    logs: LogList = [];
    constructor(public name: string) {}
}

// ensure it's only created once
// this is important, because the inpage code also uses this class
// and would otherwise create the object separately
const singleton: InsightsSingleton = 
    window.$2sxc && window.$2sxc._insights   // try to load existing
    || new InsightsSingleton();             // otherwise create new

/** @internal */
export const Insights = singleton;
