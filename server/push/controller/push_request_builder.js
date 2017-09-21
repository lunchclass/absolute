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

import PushRequest from './push_request.js';
import access from '../../base/access_modifier.js';

/**
 * PushSender class
 */
export default class PushRequestBuilder {
  @access.private endpoint;
  @access.private p256dh;
  @access.private auth;

  @access.private title;

  // options
  // string options
  @access.private body;
  @access.private tag;
  @access.private direction;

  // URL
  @access.private icon;
  @access.private image;
  @access.private badge;
  @access.private sound;

  // array of strings
  @access.private actions;
  @access.private timestamp;

  // boolean
  @access.private requireInteration;
  @access.private renotify;
  @access.private silent;

  // array of integers
  @access.private vibrate;

  // anything
  @access.private data;

  // any payload data (might no need)
  @access.private payload;

  /**
   * build method to build PushRequest
   * @return {PushRequest} PushRequest class object
   */
  build() {
    const pushKeys = {
      p256dh: this.p256dh,
      auth: this.auth,
    };

    const payload = {
      title: this.title,
      body: this.body,
      tag: this.tag,
      direction: this.direction,
      icon: this.icon,
      image: this.image,
      badge: this.badge,
      sound: this.sound,
      // need more payload
    };
    console.log('calling push request build! ' + JSON.stringify(payload));
    return new PushRequest(this.endpoint, pushKeys, payload);
  }

  /**
   * setTitle
   * @param {string} input tokens including endpoint and push keys
   * @return {Object} This class object
   */
  setTitle(input) {
    this.title = input;
    return this;
  }

  /**
   * setPushTokens
   * @param {string} input tokens including endpoint and push keys
   * @return {Object} This class object
   */
  setBody(input) {
    this.body = input;
    return this;
  }

  /**
   * setPushTokens
   * @param {string} input tokens including endpoint and push keys
   * @return {Object} This class object
   */
  setTag(input) {
    this.tag = input;
    return this;
  }

  /**
   * setDirection
   * @param {string} input direction
   * @return {Object} This class object
   */
  setDirection(input) {
    this.direction = input;
    return this;
  }

  /**
   * setIcon
   * @param {string} input tokens including endpoint and push keys
   * @return {Object} This class object
   */
  setIcon(input) {
    this.icon = input;
    return this;
  }

  /**
   * setPushTokens
   * @param {string} input tokens including endpoint and push keys
   * @return {Object} This class object
   */
  setImage(input) {
    this.image = input;
    return this;
  }

  /**
   * setPushTokens
   * @param {string} input tokens including endpoint and push keys
   * @return {Object} This class object
   */
  setBadge(input) {
    this.badge = input;
    return this;
  }

  /**
   * setPushTokens
   * @param {string} input tokens including endpoint and push keys
   * @return {Object} This class object
   */
  setSound(input) {
    this.sound = input;
    return this;
  }

  /**
   * TODO : might get action strings from action builder(action can be multiple)
   * @param {Object} input array of string actions
   * @return {Object} This class object
   */
  setActions(input) {
    this.actions = input;
    return this;
  }

  /**
   * timestamp
   * @param {Object} input array of timestamp
   * @return {Object} This class object
   */
  setTimestamp(input) {
    this.timestamp = input;
    return this;
  }

  /**
   * setPushTokens
   * @param {boolean} input tokens
   * @return {Object} This class object
   */
  setRequireInteration(input) {
    this.requireInteration = input;
    return this;
  }

  /**
   * setPushTokens
   * @param {boolean} input tokens
   * @return {Object} This class object
   */
  setRenotify(input) {
    this.renotify = input;
    return this;
  }

  /**
   * setPushTokens
   * @param {boolean} input tokens
   * @return {Object} This class object
   */
  setSilent(input) {
    this.silent = input;
    return this;
  }

  /**
   * setPushTokens
   * @param {Object} input Array of integers vibrate
   * @return {Object} This class object
   */
  setVibrate(input) {
    this.vibrate = input;
    return this;
  }

  /**
   * setPushTokens
   * @param {Object} input payload data
   * @return {Object} This class object
   */
  setPayload(input) {
    this.payload = input;
    return this;
  }

  /**
   * setPushTokens
   * @param {string} endpoint endpoint from subscription
   * @param {string} p256dh p256dh key from subscription
   * @param {string} auth auth key from subscription
   * @return {Object} This class object
   */
  setPushTokens(endpoint, p256dh, auth) {
    this.endpoint = endpoint;
    this.p256dh = p256dh;
    this.auth = auth;
    return this;
  }
}
