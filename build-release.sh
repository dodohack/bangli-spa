#!/bin/sh

# Build release package and copy

npm run build-release

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
