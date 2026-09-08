import csv
import subprocess
from urllib.parse import quote

# Configuration
OLD_CSV = "songs.csv"                    # Your original CSV
NEW_CSV = "songs_updated.csv"           # Output CSV with new column
BASE_URL = "https://pub-d7aa2a1ce06c45019530da0ea90f67d8.r2.dev"

print("📁 Building URL mapping from R2...")

# Step 1: Get all files from R2 and build mapping
result = subprocess.run(
    ['rclone', 'ls', 'alomoy:alomoy-songit/'],
    capture_output=True,
    text=True
)

# Build mapping: filename -> R2 URL
file_to_r2_url = {}
for line in result.stdout.strip().split('\n'):
    if not line.strip():
        continue
    # Split on first space (size) and rest is filepath
    parts = line.split(' ', 1)
    if len(parts) == 2:
        size, filepath = parts
        # URL-encode each path segment
        segments = filepath.split('/')
        encoded_segments = [quote(seg, safe='') for seg in segments]
        encoded_path = '/'.join(encoded_segments)
        url = f"{BASE_URL}/{encoded_path}"
        # Key by filename (last part of path)
        filename = filepath.split('/')[-1]
        file_to_r2_url[filename] = url

print(f"✅ Found {len(file_to_r2_url)} files in R2")

# Step 2: Read original CSV and add url_r2 column
print("📝 Updating CSV with url_r2 column...")

updated_count = 0
missing_count = 0
skipped_count = 0

with open(OLD_CSV, 'r', encoding='utf-8') as infile, \
     open(NEW_CSV, 'w', newline='', encoding='utf-8') as outfile:

    reader = csv.DictReader(infile)
    
    # Add 'url_r2' to fieldnames if not already present
    fieldnames = reader.fieldnames
    if 'url_r2' not in fieldnames:
        fieldnames = list(fieldnames) + ['url_r2']
    
    writer = csv.DictWriter(outfile, fieldnames=fieldnames)
    writer.writeheader()

    for row in reader:
        # Extract filename from the 'src' column (Dropbox URL)
        src_url = row.get('src', '')
        filename = src_url.split('/')[-1].split('?')[0] if src_url else ''
        
        # Skip if no filename found
        if not filename:
            row['url_r2'] = ''
            skipped_count += 1
            writer.writerow(row)
            continue
        
        # Add R2 URL if filename matches
        if filename in file_to_r2_url:
            row['url_r2'] = file_to_r2_url[filename]
            updated_count += 1
        else:
            row['url_r2'] = ''  # Leave empty if no match found
            missing_count += 1
            print(f"⚠️ Warning: '{filename}' not found in R2")
        
        writer.writerow(row)

print(f"\n✅ Updated CSV saved as: {NEW_CSV}")
print(f"   Matched and updated: {updated_count} entries")
print(f"   Missing in R2: {missing_count} entries")
print(f"   Skipped (no src URL): {skipped_count} entries")
print(f"   Total rows: {updated_count + missing_count + skipped_count}")
