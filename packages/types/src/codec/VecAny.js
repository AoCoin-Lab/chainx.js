// Copyright 2017-2019 @polkadot/types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import AbstractArray from './AbstractArray';
/**
 * @name VecAny
 * @description
 * This manages codec arrays, assuming that the inputs are already of type Codec. Unlike
 * a vector, this can be used to manage array-like structures with variable arguments of
 * any types
 */
export default class VecAny extends AbstractArray {
  /**
   * @description Returns the base runtime type name for this instance
   */
  toRawType() {
    // FIXME This is basically an any type, cannot instantiate via createType
    return 'Vec<Codec>';
  }
}