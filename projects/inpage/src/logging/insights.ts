import { HasLog, Log } from '.';
import { $2sxcInPage } from '../interfaces/sxc-controller-in-page';

type LogList = Array<{ key: string, log: Log}>;

class InsightsSingleton extends HasLog {

    constructor() {
        super('Sys.Insght');
        this.add('system', 'insights', this.log);
    }

    history: { [key: string]: InsightsLogSet } = {};

    add(setName: string, logName: string, log: Log ) {
        if (!(setName in this.history))
            this.history[setName] = new InsightsLogSet(setName);
        this.history[setName].logs.push({key: logName, log: log});
    }

    /** Provide help in the console */
    help() {
        console.log(`use the debugger to call $2sxc.insights.xxx where .xxx is:
        .help() - show this help
        .show() - show the part names and how to console-log them
        .show(partName)`);
    }

    show(partName: string, index?: number): void {
        // if nothing specified, list what to do to see inner parts
        if (!partName) {
            const keys = Object.keys(this.history);
            console.log(`${keys.length} parts found. Execute the code shown below to list the items inside: \n` + keys.map((p) => `$2sxc.insights.show('${p}')`).join('\n'));
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
            const logNames = part.logs.map((s) => `$2sxc.insights.show('${partName}', ${count++}) - will show for '${s.key}'`).join('\n');
            console.log(logNames);
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

        console.log(`Will dump the log on ${partName}[${index}]`);
        logSet.log.dump();
    }
}

// tslint:disable-next-line: max-classes-per-file
class InsightsLogSet {
    logs: LogList = [];
    constructor(public name: string) {}
}

export const Insights = new InsightsSingleton();

$2sxcInPage.insights = Insights;
