﻿/**
 * Wildcard module declarations *.json
 * allow non-JavaScript content to be imported
 * https://hackernoon.com/import-json-into-typescript-8d465beded79
 */
declare module '*.json' {
    const value: any;
    export default value;
}