import { RuleParams } from '.';
import { Log } from '../../core';
import { TypeValue } from '../../plumbing';
/**
 * @internal
 */
export interface ProcessedParams {
    params: RuleParams;
    context: Record<string, TypeValue>;
}
/**
 * @internal
 */
export declare class RuleParamsHelper {
    static processParams(params: RuleParams, log: Log): ProcessedParams;
    private static processMetadata;
    /** Do special processing on all prefill:Field=Value rules */
    private static extractSubKeys;
    private static filterValues;
    /**
     * Process Prefill values - basically check if it's an array of GUIDs and convert to that
     * @param value
     * @returns
     */
    private static prefillValues;
}
