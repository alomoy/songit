const BENGALI_DIGITS = { "0": "০", "1": "১", "2": "২", "3": "৩", "4": "৪", "5": "৫", "6": "৬", "7": "৭", "8": "৮", "9": "৯" };
function toBengaliDigits(value) {
  return String(value).replace(/\d/g, (d) => BENGALI_DIGITS[d]);
}

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
let shuffle_btn = document.querySelector(".shuffle-track");

let download_link = document.querySelector("#download-link");

let track_list_toggle_btn = document.querySelector("#track-list-toggle");
let track_list_static_el = document.querySelector(".track-list-static");

const SEEK_STEP = 10; // seconds
const REPEAT_MODES = ["all", "one", "none"];
let repeat_mode = "all";
let shuffle_mode = false;

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

// Mobile streams (Dropbox links, over cellular/wifi handoffs) can drop
// mid-playback with no other signal than an "error" event; without this,
// playback just silently stops. Retry a few times, resuming from where it
// left off, before giving up.
let stream_retry_count = 0;
const MAX_STREAM_RETRIES = 3;

curr_track.onerror = function () {
  if (stream_retry_count >= MAX_STREAM_RETRIES) return;
  stream_retry_count += 1;
  let resumeAt = curr_track.currentTime;
  let wasPlaying = isPlaying;
  curr_track.load();
  curr_track.currentTime = resumeAt;
  if (wasPlaying) playTrack();
};

curr_track.addEventListener("loadeddata", function () {
  stream_retry_count = 0;
});

if ("mediaSession" in navigator) {
  navigator.mediaSession.setActionHandler("play", playTrack);
  navigator.mediaSession.setActionHandler("pause", pauseTrack);
  navigator.mediaSession.setActionHandler("previoustrack", prevTrack);
  navigator.mediaSession.setActionHandler("nexttrack", nextTrack);
}

// Define the tracks that have to be played

let bg_blobs_el = document.createElement("div");
bg_blobs_el.className = "bg-blobs";
for (let i = 0; i < 3; i++) {
  let blob = document.createElement("div");
  blob.className = "bg-blob bg-blob-" + (i + 1);
  bg_blobs_el.appendChild(blob);
}
document.body.appendChild(bg_blobs_el);

const FLOATING_NOTE_COUNT = 16;
// Characters from the "Musical Symbols" Unicode block (U+1D100 range) have
// very poor font coverage and render as tofu boxes on many devices,
// especially mobile. Stick to the widely-supported musical characters in
// the Miscellaneous Symbols block plus emoji, which every platform ships a
// font for.
const NOTE_GLYPHS = ["♪", "♫", "♩", "♬", "♭", "♮", "♯", "🎵", "🎶", "🎼"];
let floating_notes_el = document.createElement("div");
floating_notes_el.className = "floating-notes";
for (let i = 0; i < FLOATING_NOTE_COUNT; i++) {
  let note = document.createElement("span");
  note.className = "floating-note";
  note.textContent = NOTE_GLYPHS[Math.floor(Math.random() * NOTE_GLYPHS.length)];
  note.style.left = (Math.random() * 92).toFixed(1) + "vw";
  note.style.top = (Math.random() * 92).toFixed(1) + "vh";
  note.style.fontSize = (1.2 + Math.random() * 1.8).toFixed(2) + "rem";
  note.style.color = "hsl(" + Math.floor(Math.random() * 360) + ", 85%, 60%)";
  note.style.setProperty("--drift-x", (Math.random() * 60 - 30).toFixed(0) + "vw");
  note.style.setProperty("--drift-y", (Math.random() * 60 - 30).toFixed(0) + "vh");
  note.style.setProperty("--drift-rot", (Math.random() * 60 - 30).toFixed(0) + "deg");
  note.style.animationDuration = (10 + Math.random() * 18).toFixed(1) + "s";
  note.style.animationDelay = (-Math.random() * 25).toFixed(1) + "s";
  floating_notes_el.appendChild(note);
}
document.body.appendChild(floating_notes_el);

function random_bg_color() {
  // The page background stays the site's dark theme color (set in
  // style.css); only the glow blobs get a per-track hue, matching the
  // cyan/purple/pink accent glow used on the rest of the site while still
  // giving each song a distinct mood.
  let hue = Math.floor(Math.random() * 360);
  document.documentElement.style.setProperty("--blob-color-1", "hsl(" + hue + ", 85%, 60%)");
  document.documentElement.style.setProperty("--blob-color-2", "hsl(" + (hue + 40) % 360 + ", 85%, 55%)");
  document.documentElement.style.setProperty("--blob-color-3", "hsl(" + (hue + 80) % 360 + ", 85%, 50%)");
}

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  stream_retry_count = 0;
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  if (track_art) track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  track_album.textContent = track_list[track_index].album;
  now_playing.textContent = "শুনছেন " + toBengaliDigits(track_list.length) + "টি সঙ্গীতের " + toBengaliDigits(track_index + 1) + " নম্বরটি";

  if ("mediaSession" in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: track_list[track_index].name,
      artist: track_list[track_index].artist,
      album: track_list[track_index].album,
      artwork: [{ src: track_list[track_index].image }],
    });
  }

  if (download_link) {
    download_link.href = track_list[track_index].path.replace("dl=0", "dl=1");
  }

  if (track_list_static_el) {
    track_list_static_el.querySelectorAll("li").forEach(function (li) {
      li.classList.toggle("active", Number(li.dataset.trackIndex) === track_index);
    });
  }

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.onended = handleTrackEnd;
  random_bg_color();
}

function resetValues() {
  curr_time.textContent = "০০:০০";
  total_duration.textContent = "০০:০০";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  // curr_track.play() returns a promise that can reject (autoplay policy
  // revoked after the tab was backgrounded, a network hiccup, etc.); left
  // unhandled, that failure was completely silent and the UI kept claiming
  // playback that wasn't happening. Retry once, then fall back honestly.
  curr_track.play().catch(function () {
    setTimeout(function () {
      curr_track.play().catch(function () {
        isPlaying = false;
        playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
        if ("mediaSession" in navigator) navigator.mediaSession.playbackState = "paused";
      });
    }, 800);
  });
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
  if ("mediaSession" in navigator) navigator.mediaSession.playbackState = "playing";
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
  if ("mediaSession" in navigator) navigator.mediaSession.playbackState = "paused";
}

function getRandomIndex() {
  if (track_list.length <= 1) return track_index;
  let idx;
  do {
    idx = Math.floor(Math.random() * track_list.length);
  } while (idx === track_index);
  return idx;
}

function nextTrack() {
  if (shuffle_mode)
    track_index = getRandomIndex();
  else if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (shuffle_mode)
    track_index = getRandomIndex();
  else if (track_index > 0)
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

  if (shuffle_mode) {
    track_index = getRandomIndex();
  } else if (track_index < track_list.length - 1) {
    track_index += 1;
  } else if (repeat_mode === "none") {
    pauseTrack();
    return;
  } else {
    track_index = 0;
  }
  loadTrack(track_index);
  playTrack();
}

function toggleShuffle() {
  shuffle_mode = !shuffle_mode;
  updateShuffleUI();
}

function updateShuffleUI() {
  if (!shuffle_btn) return;
  shuffle_btn.classList.toggle("shuffle-on", shuffle_mode);
  shuffle_btn.title = shuffle_mode ? "Shuffle: On" : "Shuffle: Off";
}

updateShuffleUI();

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

let track_list_sheet_el = null;
let track_list_backdrop_el = null;

if (track_list_static_el) {
  track_list_sheet_el = document.createElement("div");
  track_list_sheet_el.className = "track-list-sheet";
  // Appended directly to body (not left inside .player) so its z-index isn't
  // trapped inside .player's own stacking context (position:relative;
  // z-index:1), which would otherwise let the backdrop paint over it and
  // swallow clicks meant for the track list.
  document.body.appendChild(track_list_sheet_el);

  let handle = document.createElement("div");
  handle.className = "track-list-handle";
  track_list_sheet_el.appendChild(handle);

  let closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.className = "track-list-close";
  closeBtn.setAttribute("aria-label", "Close track list");
  closeBtn.innerHTML = '<i class="fa fa-times"></i>';
  closeBtn.addEventListener("click", closeTrackList);
  track_list_sheet_el.appendChild(closeBtn);

  track_list_sheet_el.appendChild(track_list_static_el);

  track_list_backdrop_el = document.createElement("div");
  track_list_backdrop_el.className = "track-list-backdrop";
  track_list_backdrop_el.addEventListener("click", closeTrackList);
  document.body.appendChild(track_list_backdrop_el);

  track_list_static_el.addEventListener("click", function (e) {
    let li = e.target.closest("li[data-track-index]");
    if (!li) return;
    track_index = Number(li.dataset.trackIndex);
    loadTrack(track_index);
    playTrack();
    closeTrackList();
  });
}

function openTrackList() {
  if (!track_list_sheet_el) return;
  track_list_sheet_el.classList.add("open");
  track_list_backdrop_el.classList.add("open");
  track_list_toggle_btn.setAttribute("aria-expanded", "true");
  document.body.classList.add("no-scroll");
}

function closeTrackList() {
  if (!track_list_sheet_el) return;
  track_list_sheet_el.classList.remove("open");
  track_list_backdrop_el.classList.remove("open");
  track_list_toggle_btn.setAttribute("aria-expanded", "false");
  document.body.classList.remove("no-scroll");
}

function toggleTrackList() {
  if (!track_list_sheet_el) return;
  if (track_list_sheet_el.classList.contains("open")) closeTrackList();
  else openTrackList();
}

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

    curr_time.textContent = toBengaliDigits(currentMinutes + ":" + currentSeconds);
    total_duration.textContent = toBengaliDigits(durationMinutes + ":" + durationSeconds);
  }
}
