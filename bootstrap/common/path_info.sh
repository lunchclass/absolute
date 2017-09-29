#!/bin/bash
#
# Copyright (c) 2017 The Absolute Authors.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

function absolute_path() {
  echo $ABSOLUTE_PATH
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
