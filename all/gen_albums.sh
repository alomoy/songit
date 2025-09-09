#!/bin/bash

# Create folders if not exist
mkdir -p album css js

# Function to make filenames safe but Bangla-friendly
safe_album() {
  echo "$1" | sed 's/[\/:*?"<>|]/_/g' | tr ' ' '_' | sed 's/__\+/_/g'
}

# Create shared style.css if not exist
if [ ! -f css/style.css ]; then
cat <<EOF > css/style.css
body {
  font-family: sans-serif;
  padding: 20px;
  background: #f9f9f9;
}
h1 {
  color: #333;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin: 10px 0;
  padding: 10px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.active {
  background-color: #007bff;
  color: white;
}
.controls, .progress-container {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  flex-wrap: wrap;
}
.progress-bar {
  flex-grow: 1;
  height: 6px;
  background: #ccc;
  border-radius: 3px;
  cursor: pointer;
  position: relative;
}
.progress-bar-fill {
  background: #007bff;
  height: 100%;
  width: 0%;
}
.time-display {
  font-size: 14px;
  min-width: 40px;
  text-align: center;
}
EOF
echo "✅ Created css/style.css"
fi

# Create shared player.js if not exist
if [ ! -f js/player.js ]; then
cat <<'EOF' > js/player.js
const audio = document.getElementById('audio-player');
const playlistItems = document.querySelectorAll('#playlist li');
const playPauseBtn = document.getElementById('play-pause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const rewindBtn = document.getElementById('rewind');
const forwardBtn = document.getElementById('forward');
const repeatBtn = document.getElementById('repeat');
const progressBar = document.getElementById('progress-bar');
const progressBarFill = document.querySelector('.progress-bar-fill');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');
const volumeSlider = document.getElementById('volume');

let currentIndex = 0;
let repeatMode = 'none'; // none, one, all

function loadSong(index) {
  const item = playlistItems[index];
  if (!item) return;
  playlistItems.forEach(el => el.classList.remove('active'));
  item.classList.add('active');
  audio.src = item.getAttribute('data-src');
  audio.play();
  currentIndex = index;
}

playPauseBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    audio.pause();
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + playlistItems.length) % playlistItems.length;
  loadSong(currentIndex);
});

nextBtn.addEventListener('click', () => {
  if (repeatMode === 'one') {
    loadSong(currentIndex);
  } else {
    currentIndex = (currentIndex + 1) % playlistItems.length;
    if (currentIndex === 0 && repeatMode !== 'all') return;
    loadSong(currentIndex);
  }
});

rewindBtn.addEventListener('click', () => {
  audio.currentTime = Math.max(audio.currentTime - 10, 0);
});

forwardBtn.addEventListener('click', () => {
  audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
});

repeatBtn.addEventListener('click', () => {
  if (repeatMode === 'none') {
    repeatMode = 'one';
    repeatBtn.innerHTML = '<i class="fas fa-redo-alt"></i><span style="font-size:10px;">1</span>';
    repeatBtn.title = "Repeat One";
  } else if (repeatMode === 'one') {
    repeatMode = 'all';
    repeatBtn.innerHTML = '<i class="fas fa-redo"></i>';
    repeatBtn.title = "Repeat All";
  } else {
    repeatMode = 'none';
    repeatBtn.innerHTML = '<i class="fas fa-sync-alt"></i>';
    repeatBtn.title = "Repeat Off";
  }
});

playlistItems.forEach((item, index) => {
  item.addEventListener('click', () => loadSong(index));
});

audio.addEventListener('ended', () => {
  if (repeatMode === 'one') {
    loadSong(currentIndex);
  } else if (currentIndex < playlistItems.length - 1) {
    currentIndex++;
    loadSong(currentIndex);
  } else if (repeatMode === 'all') {
    loadSong(0);
  }
});

audio.addEventListener('timeupdate', () => {
  const current = audio.currentTime;
  const duration = audio.duration;
  if (!isNaN(duration)) {
    progressBarFill.style.width = (current / duration * 100) + '%';
    currentTimeDisplay.textContent = formatTime(current);
    durationDisplay.textContent = formatTime(duration);
  }
});

progressBar.addEventListener('click', (e) => {
  const rect = progressBar.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const ratio = x / rect.width;
  audio.currentTime = ratio * audio.duration;
});

volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value;
});

function formatTime(t) {
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

loadSong(0);
EOF
echo "✅ Created js/player.js"
fi

# Create HTML pages for each album
tail -n +2 ../radio/songs.csv | while IFS=',' read -r song album singer group writer tune src genre subgenre language tags; do
  album_clean=$(echo "$album" | xargs)
  [ -z "$album_clean" ] && continue
  album_safe=$(safe_album "$album_clean")
  html_file="album/${album_safe}.html"

  # Only create the file once per album
  if [ ! -f "$html_file" ]; then
    echo "🎵 Creating: album/${album_safe}.html"
    cat <<EOF > "$html_file"
<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8">
  <title>অ্যালবাম: $album_clean</title>
  <link rel="stylesheet" href="../css/style.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
</head>
<body>
  <h1>🎵 অ্যালবাম: $album_clean</h1>
  <ul id="playlist">
EOF
  fi

  # Append song entry
  echo "<li data-src=\"$src\"><strong>$song</strong><br>শিল্পী: $singer | গোষ্ঠী: $group</li>" >> "$html_file"

done

# Finish each HTML file
for f in album/*.html; do
cat <<EOF >> "$f"
  </ul>
  <div class="player-controls">
    <audio id="audio-player" preload="metadata"></audio>
    <div class="controls">
      <button id="prev"><i class="fas fa-step-backward"></i></button>
      <button id="rewind"><i class="fas fa-undo"></i></button>
      <button id="play-pause"><i class="fas fa-play"></i></button>
      <button id="forward"><i class="fas fa-redo"></i></button>
      <button id="next"><i class="fas fa-step-forward"></i></button>
      <button id="repeat" title="Repeat Off"><i class="fas fa-sync-alt"></i></button>
      <span class="time-display" id="current-time">0:00</span>
      <div class="progress-bar" id="progress-bar"><div class="progress-bar-fill"></div></div>
      <span class="time-display" id="duration">0:00</span>
      <input type="range" id="volume" min="0" max="1" step="0.01" value="1" />
    </div>
  </div>
  <script src="../js/player.js"></script>
</body>
</html>
EOF
done

echo "✅ All playlists generated successfully!"
