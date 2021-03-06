'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = naclDecrypt;

var _tweetnacl = _interopRequireDefault(require('tweetnacl'));

// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

/**
 * @name naclDecrypt
 * @summary Decrypts a message using the supplied secretKey and nonce
 * @description
 * Returns an decrypted message, using the `secret` and `nonce`.
 * @example
 * <BR>
 *
 * ```javascript
 * import { naclDecrypt } from '@chainx/util-crypto';
 *
 * naclDecrypt([...], [...], [...]); // => [...]
 * ```
 */
function naclDecrypt(encrypted, nonce, secret) {
  return _tweetnacl.default.secretbox.open(encrypted, nonce, secret) || null;
}
