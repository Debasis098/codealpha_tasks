const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const playlistEl = document.getElementById("playlist");
const playBtn = document.getElementById("playBtn");
const disc = document.getElementById("disc");

let songs = [
    { name: "song1.mp3", title: "song1",artist:"Anuv Jain"},
    { name: "song2.mp3", title: "song2",artist:"Anuv Jain"},
    { name: "song3.mp3", title: "song3",artist:"Anuv Jain"}
];

let index = 0;

/* Load Song */
function loadSong(i) {
    const song = songs[i];
    audio.src = `music/${song.name}`;
    title.innerText = song.title;
    artist.innerText = song.artist;
}

/* Initial load */
loadSong(index);

/* Play / Pause */
function playPause() {
    if (audio.paused) {
        audio.play();
        playBtn.innerText = "⏸";
        disc.style.animationPlayState = "running";
    } else {
        audio.pause();
        playBtn.innerText = "▶";
        disc.style.animationPlayState = "paused";
    }
}

/* Next */
function nextSong() {
    index = (index + 1) % songs.length;
    loadSong(index);
    audio.play();
    playBtn.innerText = "⏸";
    disc.style.animationPlayState = "running";
}

/* Previous */
function prevSong() {
    index = (index - 1 + songs.length) % songs.length;
    loadSong(index);
    audio.play();
    playBtn.innerText = "⏸";
    disc.style.animationPlayState = "running";
}

/* Progress update */
audio.addEventListener("timeupdate", () => {
    progress.value = (audio.currentTime / audio.duration) * 100 || 0;
    document.getElementById("current").innerText = formatTime(audio.currentTime);
    document.getElementById("duration").innerText = formatTime(audio.duration);
});

/* Seek */
progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

/* Volume */
volume.addEventListener("input", () => {
    audio.volume = volume.value;
});

/* Autoplay */
audio.addEventListener("ended", nextSong);

/* Time format */
function formatTime(time) {
    let min = Math.floor(time / 60);
    let sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? "0" + sec : sec}`;
}

/* Playlist */
songs.forEach((song, i) => {
    const li = document.createElement("li");
    li.innerText = song.title;
    li.onclick = () => {
        index = i;
        loadSong(index);
        audio.play();
        playBtn.innerText = "⏸";
        disc.style.animationPlayState = "running";
    };
    playlistEl.appendChild(li);
});
