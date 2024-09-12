// Get the button, audio element, and volume slider, and previous/next track buttons
const muteButton = document.getElementById("muteButton");
const audio = document.getElementById('background-music');
const volumeSlider = document.getElementById("volumeSlider");
const prevTrackButton = document.getElementById("prevTrackButton");
const nextTrackButton = document.getElementById("nextTrackButton");

let currentTrackIndex = 0;
let currentTrack = playlist[currentTrackIndex];

// Play next track
const playNextTrack = () => {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length; // Loop to the start if at the end
    currentTrack = playlist[currentTrackIndex];
    playCurrentTrack();
};

// Function to play the current track
const playCurrentTrack = () => {
    document.querySelector("#background-music source").setAttribute("src", currentTrack.path);
    audio.load();
    audio.play(); // Automatically start playing the track after loading
};

// Automatically play the next track when the current track ends
audio.addEventListener('ended', playNextTrack);

// Play previous track
const playPrevTrack = () => {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length; // Loop to the end if at the start
    currentTrack = playlist[currentTrackIndex];
    playCurrentTrack();
};

// Event listeners for the previous and next track buttons
prevTrackButton.addEventListener("click", playPrevTrack);
nextTrackButton.addEventListener("click", playNextTrack);

// Set default volume
const defaultVolume = 0.1;
audio.volume = defaultVolume;
volumeSlider.value = defaultVolume * 100; // Reflect default volume on slider

// Variable to track if audio is playing and muted state
let isPlaying = false;
let isMuted = false; // Default state

// Function to play music after user interaction
const playMusicAfterInteraction = () => {
    if (!isPlaying) {
        audio.play()
            .then(() => {
                isPlaying = true;
                console.log('Music started');
            })
            .catch(error => {
                console.error('Music play failed:', error);
            });
    }
};

// Event listener for the first interaction (e.g., click)
document.addEventListener('click', playMusicAfterInteraction, { once: true });

// Mute/unmute button event listener
muteButton.addEventListener("click", function () {
    isMuted = !isMuted;
    audio.muted = isMuted;

    // Update the button icon
    muteButton.innerHTML = isMuted
        ? '<i class="fas fa-volume-mute"></i>'
        : '<i class="fas fa-volume-up"></i>';
});

// Volume slider event listener to adjust volume
volumeSlider.addEventListener("input", function () {
    audio.volume = volumeSlider.value / 100;

    // If the slider is set to 0, update the icon to mute, otherwise to volume up
    if (volumeSlider.value == 0) {
        muteButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else {
        muteButton.innerHTML = '<i class="fas fa-volume-up"></i>';
        isMuted = false; // If user moves the slider, unmute the audio
        audio.muted = false;
    }
});
