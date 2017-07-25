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

import './service-worker-manager';
import './style/style.scss';
import codeURL from './image/test.png';
import Push from './push/push_manager.js';
import {Product, MandatoryOption, AdditionalOption} from './product/product.js';

const root = document.querySelector('#root');
const img = document.createElement('img');

root.innerHTML = '<p>Absolute Client!</p>';
img.src = codeURL;
root.appendChild(img);

// Test code of product and option class
var coffee = new Product('coffee', 3000);
var coffeeTallSize = new MandatoryOption(coffee, 'tall size', 0);
var coffeeTallSizeIce = new MandatoryOption(coffeeTallSize, 'ice', 500);
var coffeeTallSizeIceAddShot = new AdditionalOption(coffeeTallSizeIce, 'shot', 300);

console.log(coffeeTallSizeIceAddShot.cost);
console.log(coffeeTallSizeIceAddShot.name);
