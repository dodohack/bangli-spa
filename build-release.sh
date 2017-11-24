#!/bin/sh

# Build release package and copy

echo "FIXME: Enable aot build when https://github.com/angular/angular/issues/20125 is fixed"
npm run build-release-no-aot

# Replace files in folder when build success
if [ $? -eq 0 ]; then

    # Make 'dist' if it does not exist
    if [ ! -d dist ]; then 
	mkdir dist
    fi

    rm -rf dist/*
    cp -r build/* dist/
    cp build/.htaccess dist/
fi
