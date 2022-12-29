#!/usr/bin/env bash

# Script for publishing a new release.
#
# Usage:
#    Create a new release
#      ./hack/publish.sh

set -o errexit
set -o nounset
set -o pipefail

rm -rf dist
pnpm dist

PACK=$(npm pack)

echo "Signing release..."
LOG_INDEX=$(pnpm exec sigstore sign "${PACK}" | jq -r '.verificationData.tlogEntries[0].logIndex')
echo "Rekor entry: https://rekor.tlog.dev/?logIndex=${LOG_INDEX}"

echo "Publishing..."
npm publish --access public ${PACK}

echo "Cleaning up..."
rm ${PACK}
rm -rf dist
