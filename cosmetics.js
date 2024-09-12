// Toggle Mobile Menu
const hamburger = document.querySelector(".hamburger");
const navLinksMobile = document.querySelector(".nav-links-mobile");

hamburger.addEventListener("click", () => {
  const isMenuOpen = navLinksMobile.style.display === "block";
  hamburger.innerHTML = isMenuOpen
    ? '<i class="fas fa-bars"></i>'
    : '<i class="fas fa-times"></i>';
  navLinksMobile.style.display = isMenuOpen ? "none" : "block";
});

// Leaf Falling Animation
const leafContainer = document.getElementById("leaf-container");

if (!leafContainer) {
  console.error("Leaf container not found in the DOM");
} else {
  // Function to create a falling leaf
  const createFallingLeaf = () => {
    const leaf = document.createElement("div");
    leaf.classList.add("leaf");
    leaf.style.left = `${Math.random() * 100}vw`; // Random position
    const fallDuration = /* Math.random() * 2 + 3 */ 15; // fixed fall duration between 3 to 5 seconds
    leaf.style.animationDuration = `${fallDuration}s`;

    leafContainer.appendChild(leaf);

    // Remove the leaf after it falls
    setTimeout(() => {
      leaf.remove();
    }, fallDuration * 1000);
  };

  // Generate leaves based on budsPerSecond with a cap and scaling
  const generateLeavesBasedOnBPS = () => {
    // Cap the max number of leaves per interval (e.g., 50 leaves max)
    const maxLeaves = 50;

    // Use a logarithmic or root scale to slow down leaf generation as bps increases
    const leafInterval = Math.max(
      100,
      1000 / (Math.log(budsPerSecond + 1) + 1)
    ); // Adjust interval based on log scale
    setInterval(() => {
      // Generate a reasonable number of leaves based on the bps, but cap it
      const leavesToGenerate = Math.min(
        maxLeaves,
        Math.floor(Math.sqrt(budsPerSecond) / 25)
      ); // Scaled by square root

      for (let i = 0; i < leavesToGenerate; i++) {
        createFallingLeaf();
      }
    }, leafInterval);
  };

  // Start leaf generation when game starts
  generateLeavesBasedOnBPS();
}

// Function to create a floating buds animation at the mouse click position
const createFloatingBuds = (x, y, budsPerClick) => {
  const floatingText = document.createElement("div");
  floatingText.classList.add("buds-animation");
  floatingText.textContent = `+ ${budsPerClick} Bud${
    budsPerClick > 1 ? "s" : ""
  }`;

  // Set the position of the floating text
  floatingText.style.left = `${x}px`;
  floatingText.style.top = `${y}px`;

  document.body.appendChild(floatingText);

  // Remove the floating text after the animation completes
  setTimeout(() => {
    floatingText.remove();
  }, 1000); // Matches the animation duration (1s)
};

// Listen for clicks on the clicker element and trigger the animation
clickerElement.addEventListener("click", (e) => {
  // Get mouse position relative to the viewport
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  // Trigger the floating buds animation
  createFloatingBuds(mouseX, mouseY, budsPerClick);
});

// Get the button, audio element, and volume slider
const muteButton = document.getElementById("muteButton");
const audio = document.getElementById('background-music');
const volumeSlider = document.getElementById("volumeSlider");

// Set default volume
const defaultVolume = 0.1;

// Set the audio element volume to the default
audio.volume = defaultVolume;

// Set the slider value to reflect the default volume (from 0 to 100 scale)
volumeSlider.value = defaultVolume * 100; // 50% => value = 50

// Variable to track if audio is playing
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
