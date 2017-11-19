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

. $ABSOLUTE_PATH/bootstrap/common/platform_info.sh
. $ABSOLUTE_PATH/bootstrap/common/util.sh

function sync_node() {
  local target_path="./third_party/node"
  local base_url="https://nodejs.org/dist/v9.2.0"

  case $(get_platform_name) in
    windows_x86) local target_url="/node-v9.2.0-win-x86.zip" ;;
    windows_x86_64) local target_url="/node-v9.2.0-win-x64.zip" ;;
    linux_x86) local target_url="/node-v9.2.0-linux-x86.tar.gz" ;;
    linux_x86_64) local target_url="/node-v9.2.0-linux-x64.tar.gz" ;;
    darwin_x86_64) local target_url="/node-v9.2.0-darwin-x64.tar.gz" ;;
  esac

  sync_third_party $base_url$target_url $target_path
}

function sync_mongodb() {
  local target_path="./third_party/mongodb"
  local base_url="http://downloads.mongodb.org"

  case $(get_platform_name) in
    windows_x86) local target_url="/win32/mongodb-win32-i686-3.2.12.zip" ;;
    windows_x86_64) local target_url="/win32/mongodb-win32-x86_64-3.2.12.zip" ;;
    linux_x86) local target_url="/linux/mongodb-linux-i686-3.2.12.tgz" ;;
    linux_x86_64) local target_url="/linux/mongodb-linux-x86_64-3.2.12.tgz" ;;
    darwin_x86_64) local target_url="/osx/mongodb-osx-x86_64-3.2.12.tgz" ;;
  esac

  sync_third_party $base_url$target_url $target_path
}

function sync_third_party() {
  local url=$1
  local target_path=$2
  local filename=$(basename $url)

  if ! needs_sync $url $target_path; then
    return 1
  fi

  if is_windows_platform; then
    local temp_path=C:/tmp_$RANDOM
    mkdir -p $temp_path
  else
    local temp_path=$(mktemp -d)
  fi

  # Install a trap to remove temporary path if this script is finished.
  # The trap will work well when unknown breaking happens like ctrl+c.
  export TRAP_COMMAND="rm -rf $temp_path;$TRAP_COMMAND"
  trap "$TRAP_COMMAND" EXIT

  # Download the file of url into temporary path.
  if ! download $url $temp_path; then
    return 2
  fi

  # Extract the archive file into $temp_path/extract_$file_name.
  if is_windows_platform; then
    local extracted_path=$temp_path/$filename
    if ! extract_archive $temp_path/$filename $extracted_path; then
      return 3
    fi
  else
    local extracted_path=$temp_path/extract_$filename
    if ! extract_archive $temp_path/$filename $extracted_path; then
      return 3
    fi
  fi

  # Remove container directory if needed.
  if has_container_directory $extracted_path; then
    local container=$(ls $extracted_path)
    mv $extracted_path/$container/* $extracted_path
    rmdir $extracted_path/$container
  fi

  # Write a .synced file to check weather syncing is already finished later.
  echo $url > $extracted_path/.synced

  # Move final result to $target_path.
  rm -rf $target_path
  mv $extracted_path $target_path

  return 0
}

function has_container_directory() {
  local target_path=$1

  # if a number of `ls -d` equals with a number of `ls`, then we assume that
  # the target directory has only container directory.
  if [ "$(ls -d $target_path | wc -l)" = "$(ls $target_path | wc -l)" ]; then
    return 0
  fi
  return 1
}

function needs_sync() {
  local url=$1
  local target_path=$2/.synced
  local synced_url=$(test -f $target_path && cat $target_path)

  if [ "$synced_url" = "$url" ]; then
    return 1
  fi
  return 0
}
