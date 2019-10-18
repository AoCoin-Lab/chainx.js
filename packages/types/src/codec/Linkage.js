// Copyright 2017-2019 @polkadot/types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import Option from './Option';
import Struct from './Struct';
import Tuple from './Tuple';
import Vec from './Vec';

const EMPTY = new Uint8Array();

export default class Linkage extends Struct {
  constructor(Type, value) {
    super(
      {
        previous: Option.with(Type),
        next: Option.with(Type),
      },
      value
    );
  }
  static withKey(Type) {
    return class extends Linkage {
      constructor(value) {
        super(Type, value);
      }
    };
  }
  get previous() {
    return this.get('previous');
  }
  get next() {
    return this.get('next');
  }
  /**
   * @description Returns the base runtime type name for this instance
   */
  toRawType() {
    return `Linkage<${this.next.toRawType(true)}>`;
  }
  /**
   * @description Custom toU8a which with bare mode does not return the linkage if empty
   */
  toU8a() {
    // As part of a storage query (where these appear), in the case of empty, the values
    // are NOT populated by the node - follow the same logic, leaving it empty
    return this.isEmpty ? EMPTY : super.toU8a();
  }
}

export class LinkageResult extends Tuple {
  constructor([TypeKey, keys], [TypeValue, values]) {
    super(
      {
        Keys: Vec.with(TypeKey),
        Values: Vec.with(TypeValue),
      },
      [keys, values]
    );
  }
}
