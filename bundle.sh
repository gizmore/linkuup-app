#!/usr/bin/env bash
set -Eeuo pipefail

ROOT="$(pwd)"
OUTPUT="$(date '+%Y%m%d%H%M%S')_lup_app_code.tar.gz"
TEMP_DIR="$(mktemp -d)"

cleanup() {
	rm -rf "$TEMP_DIR"
}
trap cleanup EXIT

echo "Collecting tracked files from: $ROOT"

find "$ROOT" \
	-type d -name Designs -prune -o \
	\( -type d -name .git -o -type f -name .git \) -print0 |
while IFS= read -r -d '' git_entry; do
	repo="$(dirname "$git_entry")"
	relative_repo="${repo#"$ROOT"/}"

	if [[ "$repo" == "$ROOT" ]]; then
		relative_repo=""
	fi

	echo "  Repository: ${relative_repo:-.}"

	git -C "$repo" ls-files -z |
	while IFS= read -r -d '' file; do
    case "${file,,}" in
      *.svg|*.png|*.jpg|*.jpeg|*.gif)
      continue
      ;;
    esac

		source="$repo/$file"

		# Ignore tracked files that are currently missing.
		[[ -e "$source" || -L "$source" ]] || continue

		target="$TEMP_DIR"
		[[ -n "$relative_repo" ]] && target="$target/$relative_repo"

		mkdir -p "$target/$(dirname "$file")"
		cp -a "$source" "$target/$file"
	done
done

tar -C "$TEMP_DIR" -czf "$OUTPUT" .

echo "Created: $OUTPUT"