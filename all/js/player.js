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
