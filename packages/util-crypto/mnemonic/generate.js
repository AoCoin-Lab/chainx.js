'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = mnemonicGenerate;

require('../polyfill');

var _bip = require('bip39');

var _wasmCrypto = require('@chainx/wasm-crypto');

// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
// mapping of words to the actual strength (as expected)
const STRENGTH_MAP = {
  12: 16 * 8,
  15: 20 * 8,
  18: 24 * 8,
  21: 28 * 8,
  24: 32 * 8,
};
/**
 * @name mnemonicGenerate
 * @summary Creates a valid mnemonic string using using [BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki).
 * @example
 * <BR>
 *
 * ```javascript
 * import { mnemonicGenerate } from '@chainx/util-crypto';
 *
 * const mnemonic = mnemonicGenerate(); // => string
 * ```
 */

function mnemonicGenerate() {
  let numWords = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 12;
  return (0, _wasmCrypto.isReady)()
    ? (0, _wasmCrypto.bip39Generate)(numWords)
    : (0, _bip.generateMnemonic)(STRENGTH_MAP[numWords]);
}
