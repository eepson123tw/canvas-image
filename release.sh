#!/bin/sh

latest_tag=$(git describe --tags --abbrev=0 2>/dev/null)
if [ -z "$latest_tag" ]; then
  echo "No tags found, please create an initial tag."
  exit 1
fi

echo "Latest tag: $latest_tag"

if \
  { git log "$latest_tag..HEAD" --format='%s' | cut -d: -f1 | sort -u | sed -e 's/([^)]*)//' | grep -q -i -E '^feat|fix|perf|refactor|revert$' ; } || \
  { git log "$latest_tag..HEAD" --format='%s' | cut -d: -f1 | sort -u | sed -e 's/([^)]*)//' | grep -q -E '\!$' ; } || \
  { git log "$latest_tag..HEAD" --format='%b' | grep -q -E '^BREAKING CHANGE:' ; }
then
  npx --quiet standard-version@7.1.0 --skip.commit --skip.tag
  git add CHANGELOG.md package.json
  git commit --amend --no-edit
  echo "Release prepared and combined with the previous commit."
else
  echo "No applicable changes since the previous tag, skipping..."
fi
