#!/bin/bash
cp ./public/index.html ./dist/index.html
rm -rf ./dist/style
cp -r ./public/style ./dist/style
