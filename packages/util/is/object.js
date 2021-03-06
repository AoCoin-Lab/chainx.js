'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = isObject;

// Copyright 2017-2019 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

/**
 * @name isObject
 * @summary Tests for an `object`.
 * @description
 * Checks to see if the input value is a JavaScript object.
 * @example
 * <BR>
 *
 * ```javascript
 * import { isObject } from '@chainx/util';
 *
 * isObject({}); // => true
 * isObject('something'); // => false
 * ```
 */
function isObject(value) {
  return typeof value === 'object';
}
