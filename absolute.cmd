:: Copyright (c) 2017 The Absolute Authors. All rights reserved.
:: Use of this source code is governed by a BSD-style license that can be
:: found in the LICENSE file.

@ECHO OFF
set ABSOLUTE_PATH=%~dp0
Get-Process
cd %ABSOLUTE_PATH% && third_party\win-bash\bash bootstrap\absolute.sh %*
