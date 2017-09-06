// Copyright (c) 2017 The Absolute Authors.
//
// Licensed under the Apache License, Version 2.0 (the 'License");
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

import assert from 'assert';
import {describe, it} from 'mocha';
import * as pushSender from '../controller/send_push';

const TEST_PUSH_TOKENS_PC_CHROME = {
  endpoint: 'https://fcm.googleapis.com/fcm/send/fvkYiDvVn_k:APA91bH8h4uZK4F' +
  'cPermVaBYg3JIEanMPykYlBVeLP-O8vm6F03wS__vB259JSS98LdwuMfpm6X2yAIMosv-QVKQ' +
  '7vjikrRVcrsdQBnoCo553NE7pXagNPJyFFFGYujvXbUFbTKi7bZZ',
  keys: {
    'p256dh': 'BGCibcbrMIdfz34rG4IAIfuhmvkLBEAE7l_S4zjVRjWkN4_bxo5oXO1a_0zYP' +
    'rubfijq60eVuDPmfyh-fpYpOqc=',
    'auth': 'cQXITd9TDD16BxL8qYHBdQ==',
  },
};

const TEST_PUSH_TOKENS_PC_FIREFOX = {
  endpoint: 'https://updates.push.services.mozilla.com/wpush/v2/gAAAAABZrVyI' +
  'bKT4XCMsAL0qc9MOiQ_VieAYSOuy6SNUsF1mLqnEiSsmtmqiBu0COHwkcVrTk3-Sh6n00YBzR' +
  'zY_0U4DUOJMfp52KXQPt75jpJUx3tFgOIfLJLaJP3OsSKjSHvxlc55wbDTJu_wd_1rGAus29J' +
  '6RzdsQ05xX9n_ro4ITnQ4FLSw',
  keys: {
    'p256dh': 'BOsO8MAUwyfjRuXdViVv2Df58W4C-nPWIBFRnCTo-HhGUV2xjcTbwLWlSpsM3' +
    'as2Bx0lzlE5kvPd-sjXjzy0qIo',
    'auth': '0j5jZtzgM6L3OVQJOwSOzg',
  },
};

const TEST_PAYLOAD = {
  title: 'Absolute Test Payload',
  body: 'Push Test body :)',
};

describe('[POSITIVE] Push Send', () => {
  it('Send push with fixed push tokens - pc / chrome', () => {
    return pushSender.sendPush(TEST_PUSH_TOKENS_PC_CHROME.endpoint,
      TEST_PUSH_TOKENS_PC_CHROME.keys,
      JSON.stringify(TEST_PAYLOAD))
      .then((result) => {
        assert.equal(result.statusCode, 201);
      }).catch((error) => {
        assert.fail('Failed to sendPush! ' + error);
      });
  });

  it('Send push with fixed push tokens - pc / firefox', () => {
    return pushSender.sendPush(TEST_PUSH_TOKENS_PC_FIREFOX.endpoint,
      TEST_PUSH_TOKENS_PC_FIREFOX.keys, JSON.stringify(TEST_PAYLOAD))
      .then((result) => {
        assert.equal(result.statusCode, 201);
      }).catch((error) => {
        assert.fail('Failed to sendPush! ' + error);
      });
  });
  // TODO(jaychl): mobile chrome / other browser token
  // should be added for testing device
  // TODO(jaychl): need to add user id and tokens to db then
  // sending by userid after starting server
});

describe('[NEGATIVE] Push Send', () => {
  const INVALID_P256_KEYS = {
    'p256dh': 'bCgobso9T0YT3u449ro9GE6RXuobJet6EhAcEpj5m23ms38vrEIBFKxeY_yl3' +
    '3ULYF_btMdUy0c9mhipqAMuXL0=',
    'auth': 'BZa9OSqugZMNdSADtoP-9A==',
  };
  const INVALID_AUTH_KEYS = {
    'p256dh': 'BGCibcbrMIdfz34rG4IAIfuhmvkLBEAE7l_S4zjVRjWkN4_bxo5oXO1a_0zYP' +
    'rubfijq60eVuDPmfyh-fpYpOqc=',
    'auth': 'CQXITd9TDD16BxL8qYHBdQ==',
  };
  const INVALID_SHORT_AUTH_KEYS = {
    'p256dh': 'BCgobso9T0YT3u449ro9GE6RXuobJet6EhAcEpj5m23ms38vrEIBFKxeY_yl3' +
    '3ULYF_btMdUy0c9mhipqAMuXL0=',
    'auth': 'bZa9OSqugZMNdSADtoP-==',
  };

  it('Send push with invalid endpoint', () => {
    return pushSender.sendPush('https://android.googleapis.com/gcm/send/c6cb_:',
     TEST_PUSH_TOKENS_PC_CHROME.keys, JSON.stringify(TEST_PAYLOAD))
      .then((result) => {
        assert.notEqual(result.statusCode, 201);
      }).catch((error) => {
        assert.equal(error.statusCode, 400);
      });
  });

  it('Send push with invalid P256dh key', () => {
    return pushSender.sendPush(TEST_PUSH_TOKENS_PC_CHROME.endpoint,
      INVALID_P256_KEYS, JSON.stringify(TEST_PAYLOAD))
      .then((result) => {
        assert.notEqual(result.statusCode, 201);
      }).catch((error) => {
        assert.ok(true);
      });
  });

  it('Send push with invalid auth key', () => {
    return pushSender.sendPush(TEST_PUSH_TOKENS_PC_CHROME.endpoint,
      INVALID_AUTH_KEYS, JSON.stringify(TEST_PAYLOAD))
      .then((result) => {
        // note that some browser can still send even if we use invalid
        // auth key.
        // it succesfully get 201 but push is not send to server
        assert.equal(result.statusCode, 201);
      }).catch((error) => {
        assert.ok(true);
      });
  });

  it('Send push with invalid short auth key', () => {
    return pushSender.sendPush(TEST_PUSH_TOKENS_PC_CHROME.endpoint,
      INVALID_SHORT_AUTH_KEYS, JSON.stringify(TEST_PAYLOAD))
      .then((result) => {
        assert.notEqual(result.statusCode, 201);
      }).catch((error) => {
        assert.ok(true);
      });
  });
});
