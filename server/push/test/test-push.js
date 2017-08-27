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

// import assert from 'assert';
import {describe, it} from 'mocha';
import * as pushSender from '../controller/send_push';

console.log('Welcome Absolute Push Test');

const TEST_PUSH_TOKENS = {
  endpoint: 'https://android.googleapis.com/gcm/send/c6cb_vmi0ZQ:APA91bHSX9n' +
  'rDTni8LMGtJr_fgaxzJd4qa_-ZCItY6lhZKnGQjAEeuhG3BjLGyUSGK_gfai80NRvzF' +
  'wQJClgD6nl4UxRs0T7k_b2gKrPXefdVDDVxsaC3p0qQ2GQzAfO28w9NvzBDzII',
  keys: {
    'p256dh': 'BCgobso9T0YT3u449ro9GE6RXuobJet6EhAcEpj5m23ms38vrEIBFKxeY_yl3' +
    '3ULYF_btMdUy0c9mhipqAMuXL0=',
    'auth': 'BZa9OSqugZMNdSADtoP-9A==',
  },
};

const TEST_PAYLOAD = {
  'payload': {
    'title': 'Absolute Test',
    'body': 'Push Test body',
    'icon': 'absolute.ico',
  },
};

describe('Push Send Test', () => {
  it('Send push using fixed push tokens', () => {
    pushSender.sendPush(TEST_PUSH_TOKENS.endpoint, TEST_PUSH_TOKENS.keys,
      JSON.stringify(TEST_PAYLOAD))
      .then((result) => {
        if (result.statusCode == 201) {
          console.log('Test succeed' + JSON.stringify(result));
        } else {
          console.log('Test failed! ' + JSON.stringify(result));
        }
      }).catch((error) => {
        console.log('Failed to sendPush!' + error);
      });
  });
});
