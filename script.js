console.log("Welcome to Your Music Player");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "There we go", filePath: "songs/1.mp3", coverPath: "images/song.jpg", timestamp: "05:45"},
    {songName: "Be There", filePath: "songs/2.mp3", coverPath: "covers/1.jpg", timestamp: "03:32"},
    {songName: "Love Yourself", filePath: "songs/3.mp3", coverPath: "covers/2.jpg", timestamp: "02:29"},
    {songName: "Go Away", filePath: "songs/4.mp3", coverPath: "covers/3.jpg", timestamp: "05:35"},

    // Add more songs here as needed
];

// Function to initialize song items
const initializeSongItems = () => {
    songItems.forEach((element, i) => {
        element.getElementsByTagName("img")[0].src = songs[i].coverPath;
        element.querySelector(".Timestamp").innerText = songs[i].timestamp;
    });
};

// Preload audio files
const preloadAudio = () => {
    songs.forEach((song) => {
        const audio = new Audio();
        audio.src = song.filePath;
    });
};

preloadAudio();

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.src = songs[songIndex].filePath;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // Update Seekbar
    const progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Function to reset play icons
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songlistplay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

// Add event listeners to songlistplay elements
songItems.forEach((element, i) => {
    element.querySelector('.songlistplay').addEventListener('click', () => {
        makeAllPlays();
        songIndex = i;
        element.querySelector('.songlistplay').classList.remove('fa-play-circle');
        element.querySelector('.songlistplay').classList.add('fa-pause-circle');
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});

// Add event listener for the next button
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

// Add event listener for the previous button
document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

// Initial setup of song items
initializeSongItems();
