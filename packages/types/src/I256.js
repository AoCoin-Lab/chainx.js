// Copyright 2017-2018 @polkadot/types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import Int from './codec/Int';
/**
 * @name I256
 * @description
 * An 256-bit signed integer
 */
export default class I256 extends Int {
  constructor(value) {
    super(value, 256, false);
  }
}
