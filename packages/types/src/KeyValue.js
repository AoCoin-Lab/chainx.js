// Copyright 2017-2018 @polkadot/types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import Option from './codec/Option';
import Struct from './codec/Struct';
import Tuple from './codec/Tuple';
import StorageData from './StorageData';
import StorageKey from './StorageKey';
/**
 * @name KeyValue
 * @description
 * KeyValue structure. Since most of the keys and resultant values in Subtrate is
 * hashed and/or encoded, this does not wrap [[Text]], but rather a [[Bytes]]
 * for the keys and values. (Not to be confused with the KeyValue in [[Metadata]], that
 * is actually for Maps, whereas this is a representation of actaul storage values)
 */
export default class KeyValue extends Struct {
  constructor(value) {
    super(
      {
        key: StorageKey,
        value: StorageData,
      },
      value
    );
  }
  /**
   * @description The [[StorageKey]]
   */
  get key() {
    return this.get('key');
  }
  /**
   * @description The [[StorageData]]
   */
  get value() {
    return this.get('value');
  }
}
/**
 * @name KeyValueOption
 * @description
 * A key/value change. This is similar to the [[KeyValue]] structure,
 * however in this case the value could be optional. Here it extends
 * from a [[Tuple]], indicating the use inside areas such as [[StorageChangeSet]]
 */
export class KeyValueOption extends Tuple {
  constructor(value) {
    super([StorageKey, Option.with(StorageData)], value);
  }
  /**
   * @description The [[StorageKey]]
   */
  get key() {
    return this[0];
  }
  /**
   * @description The [[Option]] [[StorageData]]
   */
  get value() {
    return this[1];
  }
}
