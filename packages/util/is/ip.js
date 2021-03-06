'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = isIp;

var _ipRegex = _interopRequireDefault(require('ip-regex'));

// Copyright 2017-2019 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

/**
 * @name isIp
 * @summary Tests if the value is a valid IP address
 * @description
 * Checks to see if the value is a valid IP address. Optionally check for either v4/v6
 * @example
 * <BR>
 *
 * ```javascript
 * import { isIp } from '@chainx/util';
 *
 * isIp('192.168.0.1')); // => true
 * isIp('1:2:3:4:5:6:7:8'); // => true
 * isIp('192.168.0.1', 'v6')); // => false
 * isIp('1:2:3:4:5:6:7:8', 'v4'); // => false
 * ```
 */
function isIp(value, type) {
  // FIXME @types/ip-regex defintions are outdated
  if (type === 'v4') {
    // @ts-ignore
    return _ipRegex.default
      .v4({
        exact: true,
      })
      .test(value);
  } else if (type === 'v6') {
    // @ts-ignore
    return _ipRegex.default
      .v6({
        exact: true,
      })
      .test(value);
  }

  return (0, _ipRegex.default)({
    exact: true,
  }).test(value);
}
