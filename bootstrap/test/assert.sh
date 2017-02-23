#!/bin/bash
#
# Copyright (c) 2017 The Absolute Authors. All rights reserved.
# Use of this source code is governed by a BSD-style license that can be
# found in the LICENSE file.

function assert_equals() {
  local actual=$1
  local expected=$2
  local description=$3
  if [ "$actual" = "$expected" ]; then
    local result="PASS"
  else
    local result="FAIL"
  fi
  echo "[ $result ] $description(Actual: $1, Expected: $2)"
}

function assert_exists() {
  local expected=$1
  local description="Assert exists $1"
  if [ -f $expected ]; then
    local result="PASS"
  else
    local result="FAIL"
  fi
  echo "[ $result ] $description"
}
