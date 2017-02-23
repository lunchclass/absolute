#!/bin/bash

. bootstrap/common/path_info.sh
. bootstrap/common/sync_third_party.sh
. bootstrap/test/assert.sh

function test_sync_node() {
  sync_node && set_path_env $(third_party_path)/node/bin

  assert_exists $(third_party_path)/node/bin/node
  assert_exists $(third_party_path)/node/bin/npm
}
