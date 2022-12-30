#!/usr/bin/env bash

set -o errexit
set -o nounset
set -o pipefail

# Relocate to the root so that this script can be run from anywhere
cd "$(dirname "$0")"/..

pushd go
GOOS=js GOARCH=wasm go build -o ../wasm/containerregistry.wasm ./cmd/wasm
popd
