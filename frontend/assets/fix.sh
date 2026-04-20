#!/bin/bash

if [ -z "$1" ]; then
    echo "Usage: ./fix.sh filename.svg"
    exit 1
fi

INPUT="$1"
OUTPUT="${INPUT%.*}_fixed.svg"
EXTRACTED_PNG="extracted_$(date +%s).png"
TMP_BMP="tmp_$(date +%s).bmp"

grep -oP '(?<=base64,)[^"]+' "$INPUT" | base64 -d > "$EXTRACTED_PNG"
if [ ! -s "$EXTRACTED_PNG" ]; then
    echo "Cannot find PNG data."
    rm -f "$EXTRACTED_PNG"
    exit 1
fi

magick "$EXTRACTED_PNG" -background white -alpha remove -threshold 99% -trim +repage "$TMP_BMP"
potrace "$TMP_BMP" -s -o "$OUTPUT"
if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' 's/fill="[^"]*"//g' "$OUTPUT"
else
    sed -i 's/fill="[^"]*"//g' "$OUTPUT"
fi

rm "$EXTRACTED_PNG" "$TMP_BMP"
