'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = min;

var _bn = _interopRequireDefault(require('bn.js'));

var _assert = _interopRequireDefault(require('../assert'));

// Copyright 2017-2019 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

/**
 * @name min
 * @summary Finds and returns the smallest value in an array of BNs.
 * @example
 * <BR>
 *
 * ```javascript
 * import BN from 'bn.js';
 * import { min } from '@chainx/util';
 *
 * min([new BN(1), new BN(3), new BN(2)]).toString(); // => '1'
 * ```
 */
function min() {
  for (var _len = arguments.length, items = new Array(_len), _key = 0; _key < _len; _key++) {
    items[_key] = arguments[_key];
  }

  (0, _assert.default)(items && items.length >= 1, 'Must provide one or more BN arguments');
  return items.reduce((acc, val) => _bn.default.min(acc, val), items[0]);
}
