#!/bin/bash
#
# Copyright (c) 2017 The Absolute Authors. All rights reserved.
# Use of this source code is governed by a BSD-style license that can be
# found in the LICENSE file.

. $ABSOLUTE_PATH/bootstrap/common/path_info.sh
. $ABSOLUTE_PATH/bootstrap/common/sync_third_party.sh

# Copy githooks to .git/hooks.
cp $(githooks_path)/* $(absolute_path)/.git/hooks

# Set path
if is_windows_platform; then
  if [ "$1" = "from-cmd" ]; then
    set_path_env $(third_party_path)/win-bash
  fi
  set_path_env $(third_party_path)/win-wget
  set_path_env $(third_party_path)/win-unzip/bin
fi
set_path_env $(third_party_path)/mongodb/bin
set_path_env $(bootstrap_command_path)
set_path_env $(absolute_path)/node_modules/.bin

# Sync third_parties.
sync_node
sync_mongodb

for command in $(ls $(bootstrap_command_path)); do
  if [ "$2" = "$command" ]; then
    shift 2
    $(bootstrap_command_path)/$command $@
    exit
  fi
done

$(bootstrap_command_path)/help
