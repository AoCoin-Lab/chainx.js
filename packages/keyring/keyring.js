'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

var _util = require('@chainx/util');

var _utilCrypto = require('@chainx/util-crypto');

var _address = require('./address');

var _defaults = require('./defaults');

var _pair = _interopRequireDefault(require('./pair'));

var _pairs = _interopRequireDefault(require('./pairs'));

// Copyright 2017-2019 @polkadot/keyring authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

/**
 * # @polkadot/keyring
 *
 * ## Overview
 *
 * @name Keyring
 * @summary Keyring management of user accounts
 * @description Allows generation of keyring pairs from a variety of input combinations, such as
 * json object containing account address or public key, account metadata, and account encoded using
 * `addFromJson`, or by providing those values as arguments separately to `addFromAddress`,
 * or by providing the mnemonic (seed phrase) and account metadata as arguments to `addFromMnemonic`.
 * Stores the keyring pairs in a keyring pair dictionary. Removal of the keyring pairs from the keyring pair
 * dictionary is achieved using `removePair`. Retrieval of all the stored pairs via `getPairs` or perform
 * lookup of a pair for a given account address or public key using `getPair`. JSON metadata associated with
 * an account may be obtained using `toJson` accompanied by the account passphrase.
 */
class Keyring {
  constructor() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this._pairs = void 0;
    this._type = void 0;
    this.decodeAddress = _address.decodeAddress;
    this.encodeAddress = _address.encodeAddress;
    this.setAddressPrefix = _address.setAddressPrefix;
    options.type = options.type || 'ed25519';
    (0, _util.assert)(
      options && ['ed25519', 'sr25519'].includes(options.type || 'undefined'),
      "Expected a keyring type of either 'ed25519' or 'sr25519', found '".concat(options.type)
    );
    this._pairs = new _pairs.default();
    this._type = options.type;
    (0, _address.setAddressPrefix)((0, _util.isNumber)(options.addressPrefix) ? options.addressPrefix : 42);
  }

  /**
   * @description retrieve the pairs (alias for getPairs)
   */
  get pairs() {
    return this.getPairs();
  }
  /**
   * @description retrieve the publicKeys (alias for getPublicKeys)
   */

  get publicKeys() {
    return this.getPublicKeys();
  }
  /**
   * @description Returns the type of the keyring, either ed25519 of sr25519
   */

  get type() {
    return this._type;
  }
  /**
   * @name addPair
   * @summary Stores an account, given a keyring pair, as a Key/Value (public key, pair) in Keyring Pair Dictionary
   */

  addPair(pair) {
    return this._pairs.add(pair);
  }
  /**
   * @name addFromAddress
   * @summary Stores an account, given an account address, as a Key/Value (public key, pair) in Keyring Pair Dictionary
   * @description Allows user to explicitely provide separate inputs including account address or public key, and optionally
   * the associated account metadata, and the default encoded value as arguments (that may be obtained from the json file
   * of an account backup), and then generates a keyring pair from them that it passes to
   * `addPair` to stores in a keyring pair dictionary the public key of the generated pair as a key and the pair as the associated value.
   */

  addFromAddress(address) {
    let meta = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let encoded = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    let type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.type;
    let ignoreChecksum = arguments.length > 4 ? arguments[4] : undefined;
    const publicKey = this.decodeAddress(address, ignoreChecksum);
    return this.addPair(
      (0, _pair.default)(
        type,
        {
          publicKey,
        },
        meta,
        encoded
      )
    );
  }
  /**
   * @name addFromJson
   * @summary Stores an account, given JSON data, as a Key/Value (public key, pair) in Keyring Pair Dictionary
   * @description Allows user to provide a json object argument that contains account information (that may be obtained from the json file
   * of an account backup), and then generates a keyring pair from it that it passes to
   * `addPair` to stores in a keyring pair dictionary the public key of the generated pair as a key and the pair as the associated value.
   */

  addFromJson(_ref, ignoreChecksum) {
    let {
      address,
      encoded,
      encoding: { content, version },
      meta,
    } = _ref;
    const type = version === '0' || !Array.isArray(content) ? this.type : content[1];
    return this.addFromAddress(address, meta, (0, _util.hexToU8a)(encoded), type, ignoreChecksum);
  }
  /**
   * @name addFromMnemonic
   * @summary Stores an account, given a mnemonic, as a Key/Value (public key, pair) in Keyring Pair Dictionary
   * @description Allows user to provide a mnemonic (seed phrase that is provided when account is originally created)
   * argument and a metadata argument that contains account information (that may be obtained from the json file
   * of an account backup), and then generates a keyring pair from it that it passes to
   * `addPair` to stores in a keyring pair dictionary the public key of the generated pair as a key and the pair as the associated value.
   */

  addFromMnemonic(mnemonic) {
    let meta = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.type;
    return this.addFromUri(mnemonic, meta, type);
  }
  /**
   * @name addFromSeed
   * @summary Stores an account, given seed data, as a Key/Value (public key, pair) in Keyring Pair Dictionary
   * @description Stores in a keyring pair dictionary the public key of the pair as a key and the pair as the associated value.
   * Allows user to provide the account seed as an argument, and then generates a keyring pair from it that it passes to
   * `addPair` to store in a keyring pair dictionary the public key of the generated pair as a key and the pair as the associated value.
   */

  addFromSeed(seed) {
    let meta = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.type;
    const keypair =
      type === 'sr25519'
        ? (0, _utilCrypto.schnorrkelKeypairFromSeed)(seed)
        : (0, _utilCrypto.naclKeypairFromSeed)(seed);
    return this.addPair((0, _pair.default)(type, keypair, meta, null));
  }
  /**
   * @name addFromUri
   * @summary Creates an account via an suri
   * @description Extracts the phrase, path and password from a SURI format for specifying secret keys `<secret>/<soft-key>//<hard-key>///<password>` (the `///password` may be omitted, and `/<soft-key>` and `//<hard-key>` maybe repeated and mixed). The secret can be a hex string, mnemonic phrase or a string (to be padded)
   */

  addFromUri(suri) {
    let meta = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.type;
    return this.addPair(this.createFromUri(suri, meta, type));
  }
  /**
   * @name createFromUri
   * @summry Creates a Keypair from an suri
   * @description This creates a pair from the suri, but does not add it to the keyring
   */

  createFromUri(_suri) {
    let meta = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.type;
    // here we only aut-add the dev phrase if we have a hard-derived path
    const suri = _suri.indexOf('//') === 0 ? ''.concat(_defaults.DEV_PHRASE).concat(_suri) : _suri;
    const { password, phrase, path } = (0, _utilCrypto.keyExtractSuri)(suri);
    let seed;

    if ((0, _util.isHex)(phrase, 256)) {
      seed = (0, _util.hexToU8a)(phrase);
    } else {
      const str = phrase;
      const parts = str.split(' ');

      if ([12, 15, 18, 21, 24].includes(parts.length)) {
        // FIXME This keeps compat with older versions, but breaks compat with subkey
        // seed = type === 'sr25519'
        //   ? mnemonicToMiniSecret(phrase, password)
        //   : mnemonicToSeed(phrase, password);
        seed = (0, _utilCrypto.mnemonicToMiniSecret)(phrase, password);
      } else {
        (0, _util.assert)(
          str.length <= 32,
          'specified phrase is not a valid mnemonic and is invalid as a raw seed at > 32 bytes'
        );
        seed = (0, _util.stringToU8a)(str.padEnd(32));
      }
    }

    const keypair =
      type === 'sr25519'
        ? (0, _utilCrypto.schnorrkelKeypairFromSeed)(seed)
        : (0, _utilCrypto.naclKeypairFromSeed)(seed);
    const derived = (0, _utilCrypto.keyFromPath)(keypair, path, type);
    return (0, _pair.default)(type, derived, meta, null);
  }
  /**
   * @name getPair
   * @summary Retrieves an account keyring pair from the Keyring Pair Dictionary, given an account address
   * @description Returns a keyring pair value from the keyring pair dictionary by performing
   * a key lookup using the provided account address or public key (after decoding it).
   */

  getPair(address) {
    return this._pairs.get(address);
  }
  /**
   * @name getPairs
   * @summary Retrieves all account keyring pairs from the Keyring Pair Dictionary
   * @description Returns an array list of all the keyring pair values that are stored in the keyring pair dictionary.
   */

  getPairs() {
    return this._pairs.all();
  }
  /**
   * @name getPublicKeys
   * @summary Retrieves Public Keys of all Keyring Pairs stored in the Keyring Pair Dictionary
   * @description Returns an array list of all the public keys associated with each of the keyring pair values that are stored in the keyring pair dictionary.
   */

  getPublicKeys() {
    return this._pairs.all().map(_ref2 => {
      let { publicKey } = _ref2;
      return publicKey();
    });
  }
  /**
   * @name removePair
   * @description Deletes the provided input address or public key from the stored Keyring Pair Dictionary.
   */

  removePair(address) {
    this._pairs.remove(address);
  }
  /**
   * @name toJson
   * @summary Returns a JSON object associated with the input argument that contains metadata assocated with an account
   * @description Returns a JSON object containing the metadata associated with an account
   * when valid address or public key and when the account passphrase is provided if the account secret
   * is not already unlocked and available in memory. Note that in [Polkadot-JS Apps](https://github.com/polkadot-js/apps) the user
   * may backup their account to a JSON file that contains this information.
   */

  toJson(address, passphrase) {
    return this._pairs.get(address).toJson(passphrase);
  }
}

exports.default = Keyring;
