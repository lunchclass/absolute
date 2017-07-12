// Copyright (c) 2017 The Absolute Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * product class
 */
export class Product {
  /**
   * @constructor
   * @param {String} product name
   * @param {Int} product cost
   */
  constructor (name, cost) {
    this._name = name;
    this._cost = cost;
  }

  /**
   * @return {String} name
   */
  get name () {
    return this._name;
  }

  /**
   * @return {Int} cost
   */
  get cost () {
    return this._cost;
  }
}

/**
 * product decorator class
 */
class ProductOptionDeco extends Product {
  /**
   * @constructor
   * @param {product} base product
   * @param {String} product option name
   * @param {Int} product option cost
   */
  constructor (product, name, cost) {
    super(name, cost);
    this._product = product;
  }

  /**
   * @return {String} name
   */
  get name () {
    return this._product.name + ' + ' + super.name;
  }

  /**
   * @return {Int} cost
   */
  get cost () {
    return this._product.cost + super.cost;
  }
}

/**
 * product mandatory option class
 */
export class MandatoryOption extends ProductOptionDeco {
  /**
   * @constructor
   * @param {product} base product
   * @param {String} product option name
   * @param {Int} product option cost
   */
  constructor (product, name, cost) {
    super(product, name, cost);
  }

  /**
   * @return {String} name
   */
  get name () {
    return super.name;
  }

  /**
   * @return {Int} cost
   */
  get cost () {
    return super.cost;
  }
}

/**
 * product additional option class
 */
export class AdditionalOption extends ProductOptionDeco {
  /**
   * @constructor
   * @param {product} base product
   * @param {String} product option name
   * @param {Int} product option cost
   */
  constructor (product, name, cost) {
    super(product, name, cost);
  }

  /**
   * @return {String} name
   */
  get name () {
    return super.name;
  }

  /**
   * @return {Int} cost
   */
  get cost () {
    return super.cost;
  }
}
