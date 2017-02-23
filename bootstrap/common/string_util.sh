#!/bin/bash
#
# Copyright (c) 2017 The Absolute Authors. All rights reserved.
# Use of this source code is governed by a BSD-style license that can be
# found in the LICENSE file.

# This file is providing some APIs for string conversions.

# Convert the passed input string to lower string.
# $1: Input string to convert to lower string.
# Out: Converted lower string.
function to_lower() {
  echo $1 | tr '[:upper:]' '[:lower:]'
}

# Convert the passed input string to upper string.
# $1: Input string to convert to upper string.
# Out: Converted upper string.
function to_upper() {
  echo $1 | tr '[:lower:]' '[:upper:]'
}
