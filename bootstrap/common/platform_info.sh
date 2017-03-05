#!/bin/bash
#
# Copyright (c) 2017 The Absolute Authors. All rights reserved.
# Use of this source code is governed by a BSD-style license that can be
# found in the LICENSE file.

. $ABSOLUTE_PATH/bootstrap/common/string_util.sh

# Get the platform name on current system.
# Out: The name of the platform that invokes this function.
function get_platform_name() {
  # If the OS system is MS windows, then we can check a processor type via
  # the following environment variables:
  #   $PROCESSOR_ARCHITECTURE: Reports the native processor architecture
  #                            EXCEPT for WOW64, where it reports x86.
  #   $PROCESSOR_ARCHITEW6432: Not used EXCEPT for WOW64, where it reports
  #                            the original native processor architecture.
  #
  # Please see the following link in details:
  #   https://blogs.msdn.microsoft.com/david.wang/2006/03/27/howto-detect-process-bitness/
  if [ "$(to_lower $PROCESSOR_ARCHITEW6432)" = "amd64" \
      -o "$(to_lower $PROCESSOR_ARCHITECTURE)" = "amd64" ]; then
    echo "windows_x86_64"
    return
  fi

  os_name=$(to_lower $(uname -s))
  if [ "$os_name" = "windows_nt" ]; then
    echo "windows_x86"
    return
  fi

  echo $os_name"_"$(uname -m)
}

function is_windows_platform() {
  case $(get_platform_name) in
    windows_x86|windows_x86_64) return 0
  esac
  return 1
}

function is_linux_platform() {
  case $(get_platform_name) in
    linux_x86|linux_x86_64) return 0
  esac
  return 1
}

function is_darwin_platform() {
  case $(get_platform_name) in
    darwin_x86|darwin_x86_64) return 0
  esac
  return 1
}
