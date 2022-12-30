#!/usr/bin/env bash

# Script for publishing a new release.
#
# Usage:
#    Create a new release
#      ./hack/publish.sh

set -o errexit
set -o nounset
set -o pipefail

if [[ $# -eq 0 ]] ; then
    echo 'Missing package. Example usage: `./hack/release.sh "packages/rekor"`'
    exit 1
fi
readonly PACKAGE="${1}"

pushd "${PACKAGE}"

rm -rf dist
pnpm dist

PACK=$(pnpm pack)
echo $PACK

echo "Signing release..."
LOG_INDEX=$(pnpm sigstore sign "${PACK}" | jq -r '.verificationData.tlogEntries[0].logIndex')
echo "Rekor entry: https://rekor.tlog.dev/?logIndex=${LOG_INDEX}"

echo "Publishing..."
pnpm publish ${PACK}
