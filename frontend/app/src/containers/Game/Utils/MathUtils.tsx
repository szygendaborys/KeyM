import { strictEqual } from "assert";

export const addLeadingZero = (value:number, minimalLength:number = 2) => {
    const getPrefix = function() {
        let prefix = ``;
        const length = value.toString().length;
        for(let i = 0; i < (minimalLength - length); i++) {
            prefix += `0`;
        }
        return prefix;
    };
    return `${getPrefix()}${value}`;
}