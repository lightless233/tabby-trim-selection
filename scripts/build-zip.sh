#!/bin/sh

set -eu

project_dir=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
version=${npm_package_version:?run this script through npm run package:zip}
archive="$project_dir/tabby-trim-selection-$version.zip"
staging_dir=$(mktemp -d /tmp/tabby-trim-selection.XXXXXX)

case "$staging_dir" in
    /tmp/tabby-trim-selection.*) ;;
    *) exit 1 ;;
esac

trap 'find "$staging_dir" -depth -delete' EXIT

plugin_dir="$staging_dir/node_modules/tabby-trim-selection"
mkdir -p "$plugin_dir/dist"
install -m 0644 "$project_dir/package.json" "$plugin_dir/package.json"
install -m 0644 "$project_dir/README.md" "$plugin_dir/README.md"
install -m 0644 "$project_dir/dist/index.js" "$plugin_dir/dist/index.js"
install -m 0644 "$project_dir/dist/index.js.map" "$plugin_dir/dist/index.js.map"

archive_tmp="$archive.tmp"
(
    cd "$staging_dir"
    find node_modules -type f -print | LC_ALL=C sort | zip -X "$archive_tmp" -@
)
mv "$archive_tmp" "$archive"

echo "$archive"
