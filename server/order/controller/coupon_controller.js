// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

const Product = require('../model/product');
const pushController = require('../../push/controller/push_controller');

const dday = new Date(2017, 3, 7, 16, 30, 0); // month starts from 0
const couponUriPrefix = '/order/coupon';
const coupons = ['wedding_coupon_1.jpg',
  'wedding_coupon_2.jpg',
  'wedding_coupon_3.jpg',
  'wedding_coupon_4.jpg',
  'wedding_coupon_5.jpg',
  'wedding_coupon_6.jpg',
  'wedding_coupon_7.jpg',
  'wedding_coupon_8.jpg',
  'wedding_coupon_9.jpg',
  'wedding_coupon_10.jpg'];

let curCoupons = 0;
const couponMap = Object();

function getCouponName(userId) {
  if (couponMap[`${userId}`]) {
    console.log(`${userId} already issued coupon : ${couponMap[`${userId}`]}`);
    return null;
  }
    // map coupon
  const couponName = coupons[curCoupons];
  if (couponName) {
    couponMap[`${userId}`] = couponName;
    curCoupons += 1;
    console.log(`coupon : ${couponName} issued`);
    return couponName;
  }
  console.log('couponName is not valid!');
  return null;
}

exports.sendCouponMessage = function (userId) {
  return new Promise((resolve, reject) => {
    if (userId) {
      pushController.getToken(userId).then((token) => {
        const now = new Date();

        let pushMessage =
          { title: '축하해 주셔서 감사합니다!',
            body: '사진을 정상적으로 등록 했습니다.',
            icon: '',
            url: 'https://nadongguri.com/wedding/' };

        if (now.getTime() >= dday.getTime()) {
          console.log(`Found token ${token}. lets send order finished`);
          console.log(`Current coupon index : ${curCoupons}`);

          if (curCoupons < coupons.length) {
            const couponName = getCouponName(userId);
            console.log(couponName);
            if (couponName) {
              pushMessage = { title: '축하해 주셔서 감사합니다!',
                body: '여기를 눌러서 신랑이 준비한 선물을 받으세요!',
                icon: '',
                url: 'https://nadongguri.com/coupon/' };
            }
          } else {
            console.log(`all ${coupons.length} coupons are issued!`);
          }
        }

        // Set push message and push to user
        pushController.setPushNotificationMessage(userId, pushMessage)
        .then((data) => {
          pushController.sendPushNotification(userId, null);
          resolve(data);
        });
      }).catch((error) => {
        console.log(error);
        reject(`push is not regisered to ${userId}`);
      });
    } else {
      reject('Invalid empty userId');
    }
  });
};

exports.getCouponUrl = function (userId) {
  return new Promise((resolve, reject) => {
    if (userId) {
      const imageName = couponMap[`${userId}`];
      if (imageName) {
        console.log(`coupon url : ${couponUriPrefix}/${imageName}`);
        resolve(`${couponUriPrefix}/${imageName}`);
      } else {
        reject(`Registered coupon not found for ${userId}`);
      }
    } else {
      reject('Invalid empty userId');
    }
  });
};
