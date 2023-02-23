#!/bin/bash

for size in 16 24 32 48 64 96 128 512 1024
do
  convert 256x256.png -resize ${size}x  -unsharp 1.5x1+0.7+0.02 ${size}x${size}.png
done
