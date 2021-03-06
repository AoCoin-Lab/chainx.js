'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = naclSign;

var _tweetnacl = _interopRequireDefault(require('tweetnacl'));

var _util = require('@chainx/util');

var _wasmCrypto = require('@chainx/wasm-crypto');

// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

/**
 * @name naclSign
 * @summary Signs a message using the supplied secretKey
 * @description
 * Returns message signature of `message`, using the `secretKey`.
 * @example
 * <BR>
 *
 * ```javascript
 * import { naclSign } from '@chainx/util-crypto';
 *
 * naclSign([...], [...]); // => [...]
 * ```
 */
function naclSign(message, _ref) {
  let { publicKey, secretKey } = _ref;
  (0, _util.assert)(secretKey, 'Expected valid secretKey');
  const messageU8a = (0, _util.u8aToU8a)(message);
  return (0, _wasmCrypto.isReady)()
    ? (0, _wasmCrypto.ed25519Sign)(publicKey, secretKey.subarray(0, 32), messageU8a)
    : _tweetnacl.default.sign.detached(messageU8a, secretKey);
}
