/**
 * Contains validator functions to use with validated inputs
 *
 * Each validator is a function that takes an input and returns a boolean.
 * Each validator checks for different criteria, but their basic argument and return structure is shared:
 *
 * @param {any} value The value to validate
 * @return {boolean} The result of the validation
 */

import mathjs from 'mathjs';

// a pared-down version of https://github.com/jquery/jquery/blob/1b9575b9d14399e9426b9eacdd92b3717846c3f2/src/core.js#L222
export function isNumeric (value) {
    const type = typeof value;
    return (type === 'number' || type === 'string') && !isNaN(value - parseFloat(value));
}

export function isParsable (value) {
    // mathjs throws an error if no argument is passed, and returns undefined if length == 0
    // mathjs supports arrays, but there will be no valid way to pass an array through this application, so must be a string
    if (value !== undefined &&
        value !== null &&
        value.length > 0 &&
        typeof value === 'string') {
            try {
                let e = mathjs.parse(value);

                // http://mathjs.org/docs/expressions/expression_trees.html
                if ((e.type === 'ConstantNode' && e.value !== undefined) ||
                    e.type === 'OperatorNode' ||
                    e.type === 'FunctionNode' ||
                    e.type === 'ParenthesisNode' ||
                    e.type === 'SymbolNode') {
                        return true;
                }
            } catch (e) {
                return false;
            }
    }
    return false;
}

/**
 * isAll takes an arbitrary number of functions and returns a validator which matches the above structure.
 * It will check validity of every function passed to it, and only return true if every validator returns true.
 */

export function isAll (...validators) {
    return (value) => {
        for (let i = 0; i < validators.length; i++) {
            if (!validators[i](value)) {
                return false;
            }
        }
        return true;
    };
}

export default {
    isNumeric: isNumeric,
    isParsable: isParsable,
    isAll: isAll
}
