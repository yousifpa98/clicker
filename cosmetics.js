// Toggle Mobile Menu
const hamburger = document.querySelector(".hamburger");
const navLinksMobile = document.querySelector(".nav-links-mobile");

hamburger.addEventListener("click", () => {
  const isMenuOpen = navLinksMobile.style.display === "block";
  hamburger.innerHTML = isMenuOpen ? '<i class="fas fa-bars"></i>' : '<i class="fas fa-times"></i>';
  navLinksMobile.style.display = isMenuOpen ? "none" : "block";
});

// Leaf Falling Animation
const leafContainer = document.getElementById('leaf-container');

if (!leafContainer) {
  console.error('Leaf container not found in the DOM');
} else {
  // Function to create a falling leaf
  const createFallingLeaf = () => {
    const leaf = document.createElement('div');
    leaf.classList.add('leaf');
    leaf.style.left = `${Math.random() * 100}vw`; // Random position
    const fallDuration = Math.random() * 2 + 3; // Random fall duration between 3 to 5 seconds
    leaf.style.animationDuration = `${fallDuration}s`;
    
    console.log('Leaf created');
    leafContainer.appendChild(leaf);

    // Remove the leaf after it falls
    setTimeout(() => {
      leaf.remove();
      console.log('Leaf removed');
    }, fallDuration * 1000);
  };

  // Generate leaves based on budsPerSecond
  const generateLeavesBasedOnBPS = () => {
    const leafInterval = Math.max(100, 1000 / (budsPerSecond + 1)); // Prevent interval from being too small
    setInterval(() => {
      const leavesToGenerate = Math.max(1, Math.floor(budsPerSecond / 10)); // Control leaf generation based on BPS
      console.log(`Generating ${leavesToGenerate} leaves`);
      for (let i = 0; i < leavesToGenerate; i++) {
        createFallingLeaf();
      }
    }, leafInterval);
  };

  // Start leaf generation when game starts
  generateLeavesBasedOnBPS();
}
