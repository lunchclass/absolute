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

import mongoose from 'mongoose';

// FIXME(coconutperm): It's temporary order schema. It will be changed.
const schema = new mongoose.Schema({
  userId: {type: String, lowercase: true, trim: true},
  items: [{
    name: {type: String, lowercase: true, trim: true},
    count: Number,
    amount: Number,
  }],
  totalAmount: Number,
  image: {data: Buffer, contentType: String},
  orderDate: {type: Date, default: Date.now},
  options: String,
});

export const Order = mongoose.model('order', schema);
