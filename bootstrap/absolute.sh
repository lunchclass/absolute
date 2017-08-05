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

. $ABSOLUTE_PATH/bootstrap/common/path_info.sh
. $ABSOLUTE_PATH/bootstrap/common/sync_third_party.sh

# Set path
if is_windows_platform; then
  set_path_env $(third_party_path)/win-bash
  set_path_env $(third_party_path)/win-wget
  set_path_env $(third_party_path)/win-unzip/bin
fi
set_path_env $(third_party_path)/mongodb/bin
set_path_env $(bootstrap_command_path)
set_path_env $(absolute_path)/node_modules/.bin

# Sync third_parties.
sync_node
sync_mongodb

# NPM update
if [ ! -f .pkg_timestamp ] || [ package.json -nt .pkg_timestamp ]; then
  npm update && > .pkg_timestamp
fi

for command in $(ls $(bootstrap_command_path)); do
  if [ "$1" = "$command" ]; then
    shift
    $(bootstrap_command_path)/$command $@
    exit
  fi
done

# TODO(nadongguri): this env vir should be set not here but before gulp command
export BABEL_CACHE_PATH=$(absolute_path)/.babel-cache.json

# ccl requires several steps. it need to turn off the gulp message
if [[ $@ = "cc" ]]; then
  gulp $@ --silent
else
  gulp $@
fi
