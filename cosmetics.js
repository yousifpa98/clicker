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

