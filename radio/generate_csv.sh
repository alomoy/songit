#!/bin/bash

# Your R2 public URL
BASE_URL="https://pub-d7aa2a1ce06c45019530da0ea90f67d8.r2.dev"

# Create CSV with header
echo "filepath,url" > songs_r2.csv

# Process rclone ls output
rclone ls alomoy:alomoy-songit/ | while read -r size filepath; do
    # URL-encode spaces and special characters
    encoded=$(echo "$filepath" | sed 's/ /%20/g' | sed 's/#/%23/g' | sed 's/&/%26/g' | sed "s/'/%27/g")
    echo "\"$filepath\",\"$BASE_URL/$encoded\"" >> songs_r2.csv
done

echo "✅ CSV created: songs_r2.csv"
