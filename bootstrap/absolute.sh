#!/bin/bash
#
# Copyright (c) 2017 The Absolute Authors. All rights reserved.
# Use of this source code is governed by a BSD-style license that can be
# found in the LICENSE file.

. $ABSOLUTE_PATH/bootstrap/common/path_info.sh
. $ABSOLUTE_PATH/bootstrap/common/sync_third_party.sh

# Sync third_parties.
sync_node
sync_mongodb

# Set path
set_path_env $(third_party_path)/mongodb/bin
set_path_env $(bootstrap_command_path)
set_path_env $(server_path)/node_modules/.bin

for command in $(ls $(bootstrap_command_path)); do
  if [ "$1" = "$command" ]; then
    shift
    $(bootstrap_command_path)/$command $@
    exit
  fi
done

$(bootstrap_command_path)/help
