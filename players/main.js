let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");
let track_album = document.querySelector(".track-album");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");
let fast_forward_btn = document.querySelector(".fast-forward");
let fast_backward_btn = document.querySelector(".fast-backward");
let repeat_btn = document.querySelector(".repeat-track");

let download_link = document.querySelector("#download-link");

const SEEK_STEP = 10; // seconds
const REPEAT_MODES = ["all", "one", "none"];
let repeat_mode = "all";

let volume_track_el = document.querySelector(".volume-track");
let volume_icon = document.querySelector(".volume-icon i");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement('audio');

// Define the tracks that have to be played

function random_bg_color() {

  // Get a number between 64 to 256 (for getting lighter colors)
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  // Construct a color withe the given values
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

  // Set the background to that color
  document.body.style.background = bgColor;
}

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  track_album.textContent = track_list[track_index].album;
  now_playing.textContent = " Playing " + (track_index + 1) + " OF " + track_list.length;

  if (download_link) {
    download_link.href = track_list[track_index].path.replace("dl=0", "dl=1");
  }

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.onended = handleTrackEnd;
  random_bg_color();
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function handleTrackEnd() {
  if (repeat_mode === "one") {
    loadTrack(track_index);
    playTrack();
    return;
  }

  if (track_index < track_list.length - 1) {
    track_index += 1;
  } else {
    if (repeat_mode === "none") {
      pauseTrack();
      return;
    }
    track_index = 0;
  }
  loadTrack(track_index);
  playTrack();
}

function fastForward() {
  curr_track.currentTime = Math.min(curr_track.currentTime + SEEK_STEP, curr_track.duration || curr_track.currentTime);
}

function fastBackward() {
  curr_track.currentTime = Math.max(curr_track.currentTime - SEEK_STEP, 0);
}

function toggleRepeat() {
  let modeIndex = REPEAT_MODES.indexOf(repeat_mode);
  repeat_mode = REPEAT_MODES[(modeIndex + 1) % REPEAT_MODES.length];
  updateRepeatUI();
}

function updateRepeatUI() {
  if (!repeat_btn) return;

  repeat_btn.classList.remove("repeat-off", "repeat-one");

  if (repeat_mode === "all") {
    repeat_btn.title = "Repeat: All";
  } else if (repeat_mode === "one") {
    repeat_btn.classList.add("repeat-one");
    repeat_btn.title = "Repeat: One";
  } else {
    repeat_btn.classList.add("repeat-off");
    repeat_btn.title = "Repeat: Off";
  }
}

updateRepeatUI();

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
  updateVolumeIcon();
}

function updateVolumeIcon() {
  if (!volume_icon) return;
  volume_icon.className = volume_slider.value == 0 ? "fa fa-volume-mute fa-2x" : "fa fa-volume-up fa-2x";
}

function toggleVolumeSlider(e) {
  e.stopPropagation();
  volume_track_el.classList.toggle("open");
}

document.addEventListener("click", function (e) {
  if (volume_track_el && !volume_track_el.contains(e.target)) {
    volume_track_el.classList.remove("open");
  }
});

if (volume_track_el) {
  volume_track_el.addEventListener("wheel", function (e) {
    e.preventDefault();
    let step = 5;
    let newValue = Number(volume_slider.value) + (e.deltaY < 0 ? step : -step);
    volume_slider.value = Math.min(100, Math.max(0, newValue));
    setVolume();
  }, { passive: false });
}

updateVolumeIcon();

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}
