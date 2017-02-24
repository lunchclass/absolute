#!/bin/bash
#
# Copyright (c) 2017 The Absolute Authors. All rights reserved.
# Use of this source code is governed by a BSD-style license that can be
# found in the LICENSE file.

function absolute_path() {
  pwd
}

function third_party_path() {
  echo $(absolute_path)/third_party
}

function bootstrap_path() {
  echo $(absolute_path)/bootstrap
}

function bootstrap_command_path() {
  echo $(bootstrap_path)/command
}

function server_path() {
  echo $(absolute_path)/server
}

function set_path_env() {
  export PATH="$1":"$PATH"
}
