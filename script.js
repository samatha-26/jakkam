// Song Data
const songs = [
  { title: "Chirunama Thana Chirunama",
     artist: "Yazin Nizar", 
     src: "songs/1- Chirunama Thana Chirunama-SenSongsMp3.Co.mp3",
    image: "akkadaki pothavu chinavada.jpg"  // Add image specific to this song
   },
  { title: "Evarevaro", 
    artist: "Vishal Mishra",
     src: "songs/Evarevaro.mp3",
     image: "animal.jpg"
   },
  { title: "chinni Chinni Aasalu", 
    artist: "Ashwin,hari,and Shreya Ghoshal",
     src: "songs/Chinni Chinni Aasalu - SenSongsMp3.Co.mp3",
     image: "manam.jpg"
   },
  { title: "Kumkumala", 
    artist: "Sid Sriram",
     src: "songs/Kumkumala.mp3",
     image: "bramastra.jpg"
   },
  { title: "Snehithuda", 
    artist: "Sadhana Sargam and srinivas",
     src: "songs/01 - Snehithuda - SenSongsMp3.co.mp3",
     image: "shakhi.jpg"
   },
  { title: "Raataan lambiyan",
     artist: "AseesKaur and Jubin Nautiyal", 
     src: "songs/Raataan Lambiyan Shershaah 128 Kbps (1).mp3",
    image: "shershaah.jpg"  // Add image specific to this song
   },
  { title: "Tum Hi ho", 
    artist: "Arijit Singh",
     src: "songs/Tum Hi Ho - Aashiqui 2 128 Kbps.mp3",
     image: "aashiqui.jpg"
   },
  { title: "Heeriye", 
    artist: "Arijit Singh and Jasleen Royal",
     src: "songs/Heeriye Arijit Singh 128 Kbps.mp3",
     image: "heeriye.jpg"
   },
  { title: "Tauba Tauba", 
    artist: "Karan Aujla",
     src: "songs/Tauba Tauba - Bad Newz 128 Kbps.mp3",
     image: "badnewz.jpg"
   },
  { title: "Angaaron", 
    artist: "Shreya Ghoshal",
     src: "songs/Angaaron - Pushpa 2 The Rule 128 Kbps.mp3",
     image: "puspha.jpg"
   },
];

let currentSongIndex = 0;
const audio = new Audio(songs[currentSongIndex].src);
const playBtn = document.getElementById("play-btn");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const songTitle = document.getElementById("song-title");
const artistName = document.getElementById("artist-name");
const progressBar = document.getElementById("progress-bar");
const currentTimeElement = document.getElementById("current-time");
const totalDurationElement = document.getElementById("total-duration");
const songList = document.getElementById("song-list");
const songImage = document.getElementById("song-image");

// Render popular songs dynamically
function renderSongs() {
  songList.innerHTML = ""; // Clear the list before rendering
  songs.forEach((song, index) => {
    const songItem = document.createElement("div");
    songItem.classList.add("song-item");

    // Create the round container for the album art or a placeholder
    const roundContainer = document.createElement("div");
    roundContainer.classList.add("song-item-round");

    // Add a play button inside the round container
    const playButton = document.createElement("button");
    playButton.classList.add("play-button");
    playButton.innerHTML = "▶️"; // Play icon
    playButton.onclick = () => playSpecificSong(index); // Call the play function when clicked
    roundContainer.appendChild(playButton); // Add play button inside the round container

    // Optional: Add an image or a placeholder for album art
    const albumArt = document.createElement("img");
    albumArt.src = song.image; // Replace with actual image URL
    albumArt.alt = `${song.title} Album Art`;
    roundContainer.appendChild(albumArt); // Add the album art inside the round container

    songItem.appendChild(roundContainer); // Add the round container to the item

    // Add the song title and artist below the round container
    const songDetails = document.createElement("div");
    songDetails.classList.add("song-item-details");
    songDetails.innerHTML = `
      <p>${song.title}</p>
      <p>${song.artist}</p>
    `;
    songItem.appendChild(songDetails); // Add the details below the round container

    songList.appendChild(songItem); // Append the entire song item
  });
}

// Play a specific song from the popular songs list
function playSpecificSong(index) {
  currentSongIndex = index;
  loadSong(currentSongIndex);
  
  audio.play();
  playBtn.textContent = "⏸"; // Change play button to pause
}

// Initialize the player
function initPlayer() {
  loadSong(currentSongIndex);
  renderSongs();
}

// Initial render of songs
renderSongs();

// Update UI
function loadSong(index) {
  const song = songs[index];
  songTitle.textContent = song.title;
  artistName.textContent = song.artist;
  songImage.src = song.image;
  audio.src = song.src;
  audio.load(); // Load the new audio source
  progressBar.value = 0; // Reset progress bar
}

// Play/Pause button functionality
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸"; // Change to pause icon
  } else {
    audio.pause();
    playBtn.textContent = "▶️"; // Change to play icon
  }
});

// Next button functionality
nextBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  audio.play();
  playBtn.textContent = "⏸"; // Change to pause icon
});

// Previous button functionality
prevBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  audio.play();
  playBtn.textContent = "⏸"; // Change to pause icon
});

audio.addEventListener("timeupdate", () => {
  progressBar.value = (audio.currentTime / audio.duration) * 100;

  // Update current time
  const currentMinutes = Math.floor(audio.currentTime / 60);
  const currentSeconds = Math.floor(audio.currentTime % 60);
  currentTimeElement.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' + currentSeconds : currentSeconds}`;

  // Update total duration
  if (!isNaN(audio.duration)) {
    const totalMinutes = Math.floor(audio.duration / 60);
    const totalSeconds = Math.floor(audio.duration % 60);
    totalDurationElement.textContent = `${totalMinutes}:${totalSeconds < 10 ? '0' + totalSeconds : totalSeconds}`;
  }
});

// Seek functionality with progress bar input
progressBar.addEventListener("input", () => {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
});

// Automatically play the next song when the current song finishes
audio.addEventListener("ended", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex); // Load the next song
  audio.play(); // Play the next song
  playBtn.textContent = "⏸"; // Change to pause icon
});

// Initialize the player
initPlayer();

// Artist Data
const artists = [
  { name: 'Shreya Ghoshal', image: 'shreya goshal.jpg' },
  { name: 'Sid Sriram', image: 'sid sriram.jpg' },
  { name: 'Arijit Singh', image: 'arijit singh.jpg' },
  { name: 'Vishal Mishra', image: 'vishal mishra.jpg' },
  { name: 'Yazin Nizar', image: 'yazin nizar.jpg' },
];

// Render artist images
const artistList = document.getElementById('artist-list');
artists.forEach((artist, index) => {
  const artistItem = document.createElement('div');
  artistItem.classList.add('artist-item');

  // Create a round container for the artist image and play button
  const roundContainer = document.createElement('div');
  roundContainer.classList.add('artist-item-round');

  // Artist Image
  const artistImage = document.createElement('img');
  artistImage.src = artist.image;
  artistImage.alt = artist.name;
  roundContainer.appendChild(artistImage);

  // Add Play Button inside the round container
  const playButton = document.createElement('button');
  playButton.classList.add('artist-play-button');
  playButton.innerHTML = "▶️"; // Play Icon
  playButton.onclick = () => playArtistSongs(artist.name); // Play artist-related songs
  roundContainer.appendChild(playButton);

  artistItem.appendChild(roundContainer);

  // Artist Name
  const artistNameElement = document.createElement('p');
  artistNameElement.textContent = artist.name;
  artistItem.appendChild(artistNameElement);

  artistList.appendChild(artistItem);
});

// Function to play songs of a specific artist
function playArtistSongs(artistName) {
  const artistSongs = songs.filter(song => song.artist.includes(artistName));

  if (artistSongs.length > 0) {
    currentSongIndex = songs.indexOf(artistSongs[0]);
    loadSong(currentSongIndex);
    audio.play();
    playBtn.textContent = "⏸"; // Change to pause icon
  } else {
    alert(`No songs available for ${artistName}`);
  }

  renderArtistSongs(artistName);
}

// Function to render songs for the specific artist
function renderArtistSongs(artistName) {
  const artistSongs = songs.filter(song => song.artist.includes(artistName));
  
  songList.innerHTML = ""; // Clear the list before rendering

  artistSongs.forEach((song, index) => {
    const songItem = document.createElement("div");
    songItem.classList.add("song-item");

    // Create round container for album art
    const roundContainer = document.createElement("div");
    roundContainer.classList.add("song-item-round");

    // Add play button inside the round container
    const playButton = document.createElement("button");
    playButton.classList.add("play-button");
    playButton.innerHTML = "▶️";
    playButton.onclick = () => playSpecificSong(index); // Call the play function when clicked
    roundContainer.appendChild(playButton);

    // Add album art
    const albumArt = document.createElement("img");
    albumArt.src = song.image;
    albumArt.alt = `${song.title} Album Art`;
    roundContainer.appendChild(albumArt);

    songItem.appendChild(roundContainer);

    // Add song title and artist below the round container
    const songDetails = document.createElement("div");
    songDetails.classList.add("song-item-details");
    songDetails.innerHTML = `
      <p>${song.title}</p>
      <p>${song.artist}</p>
    `;
    songItem.appendChild(songDetails);

    songList.appendChild(songItem); // Append the song item
  });
}

// Set initial volume
audio.volume = 0.5;

// Initial render of songs
renderSongs();

// Load initial song
loadSong(currentSongIndex);
