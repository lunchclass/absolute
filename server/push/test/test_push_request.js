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

import PushRequestBuilder from '../controller/push_request_builder.js';
import assert from 'assert';
// import pushRequest from '../controller/push_request.js';
import {describe, it} from 'mocha';
// import * as pushSender from '../controller/send_push';

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

const TEST_PAYLOAD = {
  title: 'PushRequest title',
  body: 'PushRequest body',
  tag: 'PushRequest tag',
  direction: 'auto',
  icon: 'image/test.png',
  image: 'image/test.png',
  badge: 'image/test.png',
  sound: 'sound/test.mp3',
};

describe('[POSITIVE] Push Request', () => {
  it('Send push with fixed push tokens - pc / chrome', () => {
    let reqBuilder = new PushRequestBuilder();
    reqBuilder.setTitle(TEST_PAYLOAD.title)
    .setBody(TEST_PAYLOAD.body)
    .setTag(TEST_PAYLOAD.tag)
    .setDirection(TEST_PAYLOAD.direction)
    .setIcon(TEST_PAYLOAD.icon)
    .setImage(TEST_PAYLOAD.image)
    .setBadge(TEST_PAYLOAD.badge)
    .setSound(TEST_PAYLOAD.sound);

    reqBuilder.setPushTokens(TEST_PUSH_TOKENS_PC_CHROME.endpoint,
      TEST_PUSH_TOKENS_PC_CHROME.keys.p256dh,
      TEST_PUSH_TOKENS_PC_CHROME.keys.auth);

    let request = reqBuilder.build();

    return request.send()
    .then((result) => {
      assert.equal(result.statusCode, 201);
    }).catch((error) => {
      assert.fail('Failed to sendPush! ' + error);
    });
  });
});
