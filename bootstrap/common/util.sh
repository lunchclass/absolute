#!/bin/bash
#
# Copyright (c) 2017 The Absolute Authors. All rights reserved.
# Use of this source code is governed by a BSD-style license that can be
# found in the LICENSE file.

. $ABSOLUTE_PATH/bootstrap/common/path_info.sh
. $ABSOLUTE_PATH/bootstrap/common/platform_info.sh

# Check whether the specified command can use in this platform or not.
# NOTE: This function will not be working on Windows.
# Return: 0 if the command can use in this platform.
function can_use_command() {
  type "$1" > /dev/null 2>&1
  return $?
}

# Download file in remote URL starting with http(s).
# $1: Remote file url which is start with http(s).
# $2: The location where the file will be downloaded.
# Return: 0 if the file is downloaded successfully.
function download() {
  local url=$1
  local path=${2:-./}

  if [ -z "$url" ]; then
    return 1
  fi

  echo "Downloading... $url"
  if can_use_command wget; then
    mkdir -p $path && wget --no-check-certificate $url -P $path > /dev/null 2>&1
  else
    mkdir -p $path && cd $path && \
        { curl -LO $url > /dev/null 2>&1; cd - > /dev/null; }
  fi

  return $?
}

function has_container_directory() {
  local src_path=$1

  if [ "$(dirname $(tar -tf $src_path | head -n 1))" = "." ]; then
    return 0
  fi
  return 1
}

function extract_archive() {
  local src_path=$1
  local dest_path=${2:-./}

  if [ -z "$src_path" ]; then
    return 1
  fi

  if [ ! -f "$src_path" ]; then
    return 2
  fi

  mkdir -p $dest_path
  echo "Extracting files..."
  case $src_path in
    *.tar.gz|*.tgz) tar -xvzf $src_path -C $dest_path > /dev/null 2>&1 ;;
    *.zip) unzip $src_path -d $dest_path > /dev/null 2>&1 ;;
  esac

  return $?
}
