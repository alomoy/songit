        async function loadCSV(file) {
            const response = await fetch(file);
            const text = await response.text();
            return text.split('\n').slice(1).map(line => {
                const [song, album, singer, group, writer, tune, src, genre, subgenre] = line.split(',');
                return { song, album, singer, group, writer, tune, src, genre, subgenre };
            }).filter(song => song.song && song.src);
        }

        function populateDropdown(options, dropdownId) {
            const dropdown = document.getElementById(dropdownId);
            dropdown.innerHTML = `<option value="">সকল</option>`;
            [...new Set(options)].forEach(option => {
                const optElement = document.createElement('option');
                optElement.value = option;
                optElement.textContent = option;
                dropdown.appendChild(optElement);
            });
        }

        function filterSongs() {
            const selectedAlbum = document.getElementById('albumSelect').value;
            const selectedSinger = document.getElementById('singerSelect').value;
            const selectedGroup = document.getElementById('groupSelect').value;
            const selectedGenre = document.getElementById('genreSelect').value;
            const selectedSubgenre = document.getElementById('subgenreSelect').value;

            const filteredSongs = songs.filter(song => {
                return (selectedAlbum === '' || song.album === selectedAlbum) &&
                       (selectedSinger === '' || song.singer === selectedSinger) &&
                       (selectedGroup === '' || song.group === selectedGroup) &&
                       (selectedGenre === '' || song.genre === selectedGenre) &&
                       (selectedSubgenre === '' || song.subgenre === selectedSubgenre);
            });

            displaySongs(filteredSongs);
        }

        function displaySongs(songList) {
            const songListContainer = document.getElementById('songList');
            songListContainer.innerHTML = '';
            songList.forEach((song, index) => {
                const li = document.createElement('li');
                li.textContent = `${song.song} - ${song.singer} [${song.album}]`;
                li.dataset.index = index;
                li.addEventListener('click', () => playSong(index));
                songListContainer.appendChild(li);
            });
            currentPlaylist = songList;
            currentSongIndex = 0;
        }

        function playSong(index) {
            if (currentPlaylist.length > 0 && index < currentPlaylist.length) {
                const song = currentPlaylist[index];
                audioPlayer.src = song.src;
                audioPlayer.play();
                currentSongIndex = index;
                document.getElementById('play').style.display = 'none';
                document.getElementById('pause').style.display = 'inline-block';
            }
        }

        function playNextSong() {
            currentSongIndex = (currentSongIndex + 1) % currentPlaylist.length;
            playSong(currentSongIndex);
        }

        function playPreviousSong() {
            currentSongIndex = (currentSongIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
            playSong(currentSongIndex);
        }

        function shuffleSongs() {
            shuffleMode = !shuffleMode;
            document.getElementById('shuffle').textContent = shuffleMode ? 'Shuffle On' : 'Shuffle Off';
            if (shuffleMode) {
                currentPlaylist.sort(() => Math.random() - 0.5);
            } else {
                currentPlaylist = songs;
            }
            displaySongs(currentPlaylist);
        }

        function toggleRepeat() {
            repeatMode = (repeatMode + 1) % 3;
            const repeatButton = document.getElementById('repeat');
            if (repeatMode === 0) {
                repeatButton.textContent = 'Repeat Off';
                audioPlayer.loop = false;
            } else if (repeatMode === 1) {
                repeatButton.textContent = 'Repeat All';
                audioPlayer.loop = false;
            } else {
                repeatButton.textContent = 'Repeat 1';
                audioPlayer.loop = true;
            }
        }

        // Main script
        let songs = [];
        let currentPlaylist = [];
        let currentSongIndex = 0;
        let shuffleMode = false;
        let repeatMode = 0; // 0: off, 1: all, 2: one
        const audioPlayer = document.getElementById('audioPlayer');

        // Play button logic
document.getElementById('play').addEventListener('click', () => {
    if (audioPlayer.src === '' && currentPlaylist.length > 0) {
        // If no song has been loaded yet, play the first song in the playlist
        playSong(0);
    } else if (audioPlayer.paused) {
        audioPlayer.play();
        document.getElementById('play').style.display = 'none';
        document.getElementById('pause').style.display = 'inline-block';
    }
});

        // Pause button logic
        document.getElementById('pause').addEventListener('click', () => {
            audioPlayer.pause();
            document.getElementById('pause').style.display = 'none';
            document.getElementById('play').style.display = 'inline-block';
        });

        // Next button logic
        document.getElementById('next').addEventListener('click', playNextSong);

        // Previous button logic
        document.getElementById('prev').addEventListener('click', playPreviousSong);

        // Shuffle button logic
        document.getElementById('shuffle').addEventListener('click', shuffleSongs);

        // Repeat button logic
        document.getElementById('repeat').addEventListener('click', toggleRepeat);

        // Load CSV data and populate dropdowns
        loadCSV('songs.csv').then(data => {
            songs = data;
            populateDropdown(songs.map(song => song.album), 'albumSelect');
            populateDropdown(songs.map(song => song.singer), 'singerSelect');
            populateDropdown(songs.map(song => song.group), 'groupSelect');
            populateDropdown(songs.map(song => song.genre), 'genreSelect');
            populateDropdown(songs.map(song => song.subgenre), 'subgenreSelect');
            displaySongs(songs);
        });

        // Add event listeners to dropdowns
        document.getElementById('albumSelect').addEventListener('change', filterSongs);
        document.getElementById('singerSelect').addEventListener('change', filterSongs);
        document.getElementById('groupSelect').addEventListener('change', filterSongs);
        document.getElementById('genreSelect').addEventListener('change', filterSongs);
        document.getElementById('subgenreSelect').addEventListener('change', filterSongs);

        // Handle song end
        audioPlayer.addEventListener('ended', () => {
            if (repeatMode === 1 || (repeatMode === 0 && currentSongIndex !== currentPlaylist.length - 1)) {
                playNextSong();
            }
        });

// Progress bar logic
const progressBar = document.getElementById('progressBar');
const currentTimeDisplay = document.getElementById('currentTime');
const durationDisplay = document.getElementById('totalDuration');

// Function to format time as mm:ss
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Set up metadata for duration display and progress bar max value
audioPlayer.addEventListener('loadedmetadata', () => {
    durationDisplay.textContent = formatTime(audioPlayer.duration);
    progressBar.max = audioPlayer.duration;
});

// Update progress bar smoothly and synchronize it with seconds
const updateInterval = setInterval(() => {
    if (!audioPlayer.paused && !audioPlayer.ended) {
        const currentTime = audioPlayer.currentTime;
        progressBar.value = currentTime;
        currentTimeDisplay.textContent = formatTime(currentTime);
    }
}, 500); // Update every 500ms for better synchronization

// Handle user interaction with the progress bar (seek functionality)
progressBar.addEventListener('input', () => {
    audioPlayer.currentTime = progressBar.value;
});

// Ensure the progress bar value resets when a new song is played
audioPlayer.addEventListener('play', () => {
    progressBar.value = 0;
    if (!isNaN(audioPlayer.duration) && audioPlayer.duration > 0) {
        durationDisplay.textContent = formatTime(audioPlayer.duration);
    }
});

// Handle pause event without the progress ball jumping back
audioPlayer.addEventListener('pause', () => {
    const currentTime = audioPlayer.currentTime;
    progressBar.value = currentTime; // Ensure the value stays at the current point when paused
    currentTimeDisplay.textContent = formatTime(currentTime);
});

// Update the total duration display when the song is loaded
audioPlayer.addEventListener('loadedmetadata', () => {
    durationDisplay.textContent = formatTime(audioPlayer.duration);
});



// Show Track Info

function playSong(index) {
    if (currentPlaylist.length > 0 && index < currentPlaylist.length) {
        const song = currentPlaylist[index];
        audioPlayer.src = song.src;
        audioPlayer.play();
        currentSongIndex = index;

        // Update the track info display
        updateTrackInfo(song);

        // Show play/pause buttons accordingly
        document.getElementById('play').style.display = 'none';
        document.getElementById('pause').style.display = 'inline-block';
    }
}

function updateTrackInfo(song) {
    const trackInfo = document.getElementById('trackInfo');
    trackInfo.textContent = `${song.song} - ${song.singer} - ${song.group}`;
}

// Track Info Ends

// Search

document.getElementById('searchBox').addEventListener('input', function () {
    const query = this.value.toLowerCase();

    const filteredSongs = songs.filter(song => {
        return Object.values(song).some(value => value.toLowerCase().includes(query));
    });

    displaySongs(filteredSongs);
});

// hamburgerMenu

document.getElementById("hamburgerMenu").addEventListener("click", function () {
    const dropdowns = document.querySelector(".dropdowns");
    dropdowns.classList.toggle("show");
});
