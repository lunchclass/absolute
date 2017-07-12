// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// FIXME(Wuseok): babel is not build for test module.
// Current babel was built in server part so It'll fix later.
// please check github issue number #242

const request = require('supertest');
const express = require('express');
 
const app = express();

// FIXME(Wuseok): It will be updated new test module here.
/**
* It is sample test code for test REST api
describe('GET /user', function() {
  it('respond with json', function(done) {  
    request(app)
      .get('/user')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
*/
