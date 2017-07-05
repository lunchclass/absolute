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

import access from '../base/access_modifier.js';

/**
 * ExampleBase class
 */
class ExampleBase {
  @access.private privateProperty = 'privateProperty';
  @access.protected protectedProperty = 'protectedProperty';
}

/**
 * Example class
 */
export default class Example extends ExampleBase {
  // Private properties
  @access.private privateProperty1 = 10;
  @access.private privateProperty2 = 'privateProperty2';

  @access.private
  /**
   * TODO(zino): Currently, we can not put this jsdoc comment above access
   * modifier decorator.
   *
   * This is privateMethod().
   */
  privateMethod() {
    console.log('This is privateMethod().');
  }

  /**
   * This is publicMethod().
   */
  publicMethod() {
    console.log('This is publicMethod().');
  }
}
