'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = randomAsNumber;

var _bn = _interopRequireDefault(require('bn.js'));

var _util = require('@chainx/util');

var _asHex = _interopRequireDefault(require('./asHex'));

// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
const BN_53 = new _bn.default(0b11111111111111111111111111111111111111111111111111111);
/**
 * @name randomAsNumber
 * @summary Creates a random number from random bytes.
 * @description
 * Returns a random number generated from the secure bytes.
 * @example
 * <BR>
 *
 * ```javascript
 * import { randomAsNumber } from '@chainx/util-crypto';
 *
 * randomAsNumber(); // => <random number>
 * ```
 */

function randomAsNumber() {
  return (0, _util.hexToBn)((0, _asHex.default)(8))
    .and(BN_53)
    .toNumber();
}
