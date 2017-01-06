#!/bin/bash

# TODO: Should implement this file.

PLATFORM_TYPE=`uname`

export ABSOLUTE_SCRIPTS=`pwd`
export ABSOLUTE_ROOT=${ABSOLUTE_SCRIPTS%scripts}
export ABSOLUTE_DB_PATH='UNDEFINED'
export ABSOLUTE_PLATFORM='UNDEFINED'

if [ $PLATFORM_TYPE == 'Darwin' ]; then
    echo "Run abolrute for Mac"
    ABSOLUTE_PLATFORM='$ABSOLTE_ROOT/platform/'
    ABSOLUTE_DB_PATH='$ABSOLUTE_PLATFORM/osx/noms'
## elif [ $PLATFORM_TYPE == ???_x32 ]; then
##    echo "Run abolrute for LINUXx32"
##    ABSOLUTE_PLATFORM='$ABSOLTE_ROOT/platform/'
##    ABSOLUTE_DB_PATH='$ABSOLUTE_PLATFORM/linux/noms'
## elif [ $PLATFORM_TYPE == ???_x64]; then
##    echo "Run abolrute for LINUXx32"
##    ABSOLUTE_PLATFORM='$ABSOLTE_ROOT/platform/'
##    ABSOLUTE_DB_PATH='$ABSOLUTE_PLATFORM/linux_x64/noms'
fi
