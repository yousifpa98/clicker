const version = "0.1.4";
const versionElements = document.querySelectorAll(".ver span");

versionElements.forEach((element) => {
  element.innerText = version;
});

console.log(`Running Weed Clicker version ${version}`);
console.log("Welcome to the Weed Clicker console!");

const playtimeFunction = () => {
  setInterval(() => {
    stats.miscStats.totalPlaytime += 1; // Increment by 1 second
  }, 1000); // Every second
};

const formatPlaytime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours}h ${minutes}m ${secs}s`;
};

let buds = 0;
const budsElement = document.getElementById("buds");

// Update the document title with the current number of buds
const updateDocumentTitle = () => {
  document.title = `${Math.floor(buds).toLocaleString()} buds | Weed Clicker`;
};

const clickerElement = document.getElementById("clicker");

let budsPerClick = 1;
let clickTimestamps = [];

clickerElement.addEventListener("click", () => {
  const now = Date.now();

  // Add current timestamp
  clickTimestamps.push(now);

  // Remove timestamps older than 60 seconds
  clickTimestamps = clickTimestamps.filter(
    (timestamp) => now - timestamp <= 60000
  );

  // Increment buds and other stats
  buds += budsPerClick;
  stats.basicStats.allTimeBuds += budsPerClick;
  stats.basicStats.allTimeClicks++;
  stats.miscStats.budsFromClicks += budsPerClick;
  budsElement.innerText = Math.floor(buds).toLocaleString();
  updateDocumentTitle();

  // Sync budsPerClick with stats
  stats.basicStats.currBudsPerClick = budsPerClick;
});

const calculateClicksPerSecond = () => {
  const now = Date.now();
  // Filter out timestamps older than 60 seconds
  clickTimestamps = clickTimestamps.filter(
    (timestamp) => now - timestamp <= 60000
  );
  // Calculate clicks per second
  return (clickTimestamps.length / 60).toFixed(2);
};

let budsPerSecond = 0;
const bpsElement = document.getElementById("bps");
bpsElement.innerText = budsPerSecond.toFixed(2); // Ensure budsPerSecond is shown with 2 decimal places

let lastTimestamp = Date.now();

const bpsFunction = async () => {
  const interval = 100; // 100ms interval for smoother growth

  while (true) {
    const currentTime = Date.now();
    const deltaTime = (currentTime - lastTimestamp) / 1000; // Get time elapsed in seconds
    lastTimestamp = currentTime;

    const incrementPerInterval = budsPerSecond * deltaTime; // Calculate increment based on time passed
    buds += incrementPerInterval;
    stats.basicStats.allTimeBuds += incrementPerInterval;
    stats.miscStats.totalBudsFromBuildings += incrementPerInterval; // Track buds from buildings

    budsElement.innerText = Math.floor(buds).toLocaleString(); // Display as integer and formatted with thousands separator
    updateDocumentTitle(); // Call this function to update the title with the new buds count
    await new Promise((r) => setTimeout(r, interval)); // Wait 100 milliseconds
  }
};

// Reset Game

const resetButtons = document.querySelectorAll(".resetGame");
const modal = document.getElementById("resetModal");
const confirmResetBtn = document.getElementById("confirmReset");
const cancelResetBtn = document.getElementById("cancelReset");

let resetGameTarget = null; // To track which reset button was clicked

// Loop through each reset button and add an event listener
resetButtons.forEach((resetButton) => {
  resetButton.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent default action for link buttons
    resetGameTarget = resetButton; // Store which reset button was clicked
    modal.style.display = "block"; // Show the modal
  });
});

// Reset game if confirmed
confirmResetBtn.addEventListener("click", () => {
  if (resetGameTarget) {
    localStorage.removeItem("weedClickerSave");
    location.reload(); // Reload the page to reset the game
  }
});

// Close modal if cancel is clicked
cancelResetBtn.addEventListener("click", () => {
  modal.style.display = "none"; // Hide the modal
  resetGameTarget = null; // Clear the target reset button
});

// Close modal if clicked outside of it
window.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.style.display = "none"; // Hide the modal
    resetGameTarget = null; // Clear the target reset button
  }
});

const buildingShopElement = document.getElementById("building-shop");

// Function to save the current game state to localStorage
const saveGame = () => {
  const gameData = {
    buds: buds,
    budsPerSecond: budsPerSecond,
    budsPerClick: budsPerClick, // Save budsPerClick
    buildings: buildings,
    upgrades: upgrades,
    stats: stats, // Include totalPlaytime
    isMuted: isMuted, // Save the isMuted state
  };
  localStorage.setItem("weedClickerSave", JSON.stringify(gameData));
};

// Save the game every 120 seconds
setInterval(saveGame, 120000);

const loadGame = () => {
  const savedGame = localStorage.getItem("weedClickerSave");

  if (savedGame) {
    const gameData = JSON.parse(savedGame);

    // Restore basic stats
    buds = gameData.buds || 0;
    budsPerSecond = gameData.budsPerSecond || 0;
    budsPerClick = gameData.budsPerClick || 1; // Restore budsPerClick
    stats.basicStats.currBudsPerClick = budsPerClick; // Sync currBudsPerClick

    stats.basicStats.allTimeBuds = gameData.stats?.basicStats?.allTimeBuds || 0;
    stats.basicStats.allTimeClicks =
      gameData.stats?.basicStats?.allTimeClicks || 0;

    // Restore building stats
    if (gameData.buildings) {
      gameData.buildings.forEach((savedBuilding, index) => {
        buildings[index].amount = savedBuilding.amount;
        buildings[index].cost = savedBuilding.cost;
        buildings[index].shown = savedBuilding.shown;
      });
    }

    // Restore upgrade stats
    if (gameData.upgrades) {
      gameData.upgrades.forEach((savedUpgrade, index) => {
        upgrades[index].owned = savedUpgrade.owned;
        upgrades[index].shown = savedUpgrade.shown;
      });
    }

    // Restore misc stats
    stats.miscStats.totalPlaytime =
      gameData.stats?.miscStats?.totalPlaytime || 0;
    stats.miscStats.totalBudsFromBuildings =
      gameData.stats?.miscStats?.totalBudsFromBuildings || 0;
    stats.miscStats.budsFromClicks =
      gameData.stats?.miscStats?.budsFromClicks || 0;
    stats.miscStats.totalBuildingsBought =
      gameData.stats?.miscStats?.totalBuildingsBought || 0;
    stats.miscStats.clicksPerSecond =
      gameData.stats?.miscStats?.clicksPerSecond || 0;

    // Restore fun stats
    stats.funStats.totalBudsSmoked =
      gameData.stats?.funStats?.totalBudsSmoked || 0;
    stats.funStats.timesStoned = gameData.stats?.funStats?.timesStoned || "";

    // Restore isMuted state
    isMuted = gameData.isMuted || false; // Default to false if not found
    audio.muted = isMuted; // Apply the muted state to the audio element
    muteButton.innerHTML = isMuted
      ? '<i class="fas fa-volume-mute"></i>'
      : '<i class="fas fa-volume-up"></i>';

    // Update the UI to reflect the loaded state
    budsElement.innerText = Math.floor(buds).toLocaleString(); // Format buds with thousands separator
    bpsElement.innerText = budsPerSecond.toFixed(2); // Format budsPerSecond with 2 decimal places

    // Populate the building shop and upgrade rows with the restored data
    populateBuildingShop();
    populateUpgradeRow();

    // Ensure stats are updated correctly
    updateStats();
  }
};

// Update price function to handle multiple buys
const updatePrice = (building, amountBought) => {
  building.cost = Math.floor(building.cost * Math.pow(1.1, amountBought));
};

// Function to get the selected amount
const getSelectedAmount = () => {
  const selectedInput = document.querySelector('input[name="amount"]:checked');
  if (selectedInput) {
    if (selectedInput.id === "onePer") {
      return 1;
    } else if (selectedInput.id === "tenPer") {
      return 10;
    } else if (selectedInput.id === "hundredPer") {
      return 100;
    }
  }
  return 1; // Default to 1 if none is selected
};

// Modify the buyBuilding function to handle multiples
const buyBuilding = (building) => {
  let totalCost = 0;
  let amountToBuy = 0;
  const selectedAmount = getSelectedAmount(); // Get the currently selected amount

  // Calculate the total cost for the selected amount
  for (let i = 0; i < selectedAmount; i++) {
    let currentCost = Math.floor(building.cost * Math.pow(1.1, i)); // Progressive cost increase for each additional building
    if (buds >= totalCost + currentCost) {
      totalCost += currentCost;
      amountToBuy++;
    } else {
      break; // Stop if player can't afford the next building
    }
  }

  // Check if player can afford at least one building
  if (amountToBuy > 0) {
    buds -= totalCost;
    budsPerSecond += building.bps * amountToBuy;
    bpsElement.innerText = budsPerSecond.toFixed(2); // Update budsPerSecond with 2 decimal places
    building.amount += amountToBuy;
    stats.funStats.totalBudsSmoked += totalCost;

    document.getElementById(
      building.name.replace(/\s+/g, "") + "-inventory"
    ).innerText = building.amount;
    updatePrice(building, amountToBuy); // Update price after multiple purchases
    document.getElementById(
      building.name.replace(/\s+/g, "") + "-cost"
    ).innerText = building.cost.toLocaleString(); // Format cost with thousands separator

    saveGame(); // Save the game after each purchase
  }
};

let globalBpsMultiplier = 1;

const buyUpgrade = (upgrade) => {
  if (buds >= upgrade.cost) {
    buds -= upgrade.cost;
    budsElement.innerText = Math.floor(buds).toLocaleString(); // Update the buds counter
    upgrade.owned = true;

    // Check if the upgrade affects budsPerClick
    if (upgrade.effects === "budsPerClick") {
      budsPerClick *= upgrade.multiplier; // Apply the multiplier to budsPerClick
      stats.basicStats.currBudsPerClick = budsPerClick; // Sync with stats
    } else if (Array.isArray(upgrade.effects)) {
      upgrade.effects.forEach((effect) => {
        const building = buildings.find((b) => b.name === effect);
        if (building) {
          building.bps *= upgrade.multiplier; // Apply the multiplier to building's bps
        }
      });
    } else if (upgrade.effects === "budsPerSecond") {
      globalBpsMultiplier *= upgrade.multiplier;
    }

    calculateTotalBps();
    populateUpgradeRow();
    saveGame(); // Save the game after each upgrade
  }
};

// Function to calculate the total budsPerSecond from all buildings
const calculateTotalBps = () => {
  budsPerSecond = buildings.reduce((totalBps, building) => {
    return totalBps + building.bps * building.amount;
  }, 0);

  budsPerSecond *= globalBpsMultiplier;
  bpsElement.innerText = budsPerSecond.toFixed(2); // Ensure budsPerSecond is displayed with 2 decimal places
};

const upgradeRowElement = document.getElementById("upgrade-row");

// Function to populate buildings based on showAt condition
const populateBuildingShop = () => {
  const selectedAmount = getSelectedAmount(); // Get the selected amount (1, 10, or 100)

  buildingShopElement.innerHTML = ""; // Clear the shop

  buildings.forEach((building) => {
    if (building.shown || buds >= building.showAt) {
      building.shown = true;

      const buildingDiv = document.createElement("div");
      buildingDiv.classList.add("building");

      const buildingLeftDiv = document.createElement("div");
      buildingLeftDiv.classList.add("building-left");

      const img = document.createElement("img");
      img.src = `./assets/img/${building.name.replace(/\s+/g, "")}.png`;
      img.alt = building.name;

      const titleDiv = document.createElement("div");
      titleDiv.classList.add("title");

      const h3 = document.createElement("h3");
      h3.textContent = building.name;

      const pCost = document.createElement("p");
      pCost.id = building.name.replace(/\s+/g, "") + "-cost";

      // Calculate total cost for the selected amount (1, 10, or 100 buildings)
      let totalCost = 0;
      for (let i = 0; i < selectedAmount; i++) {
        totalCost += Math.floor(building.cost * Math.pow(1.1, i));
      }
      pCost.textContent = totalCost.toLocaleString(); // Format total cost with thousands separator

      titleDiv.appendChild(h3);
      titleDiv.appendChild(pCost);

      buildingLeftDiv.appendChild(img);
      buildingLeftDiv.appendChild(titleDiv);

      const inventoryP = document.createElement("p");
      inventoryP.id = building.name.replace(/\s+/g, "") + "-inventory";
      inventoryP.classList.add("inventory");
      inventoryP.textContent = building.amount;

      buildingDiv.appendChild(buildingLeftDiv);
      buildingDiv.appendChild(inventoryP);

      buildingShopElement.appendChild(buildingDiv);

      // Apply greyscale filter if the player can't afford the selected amount
      if (buds < totalCost) {
        buildingDiv.classList.add("disabled");
        buildingDiv.style.filter = "grayscale(100%)";
      } else {
        buildingDiv.classList.remove("disabled");
        buildingDiv.style.filter = "none";
      }

      // Add the event listener to buy the building when clicked
      buildingDiv.addEventListener("click", () => {
        if (buds >= totalCost) {
          buyBuilding(building); // Call buyBuilding with the selected amount
        }
      });
    }
  });
};

// Select all radio inputs and labels
const radioInputs = document.querySelectorAll('input[name="amount"]');
const labels = document.querySelectorAll(".amount label");

// Function to update the label styles based on the checked radio button
const updateLabelStyles = () => {
  radioInputs.forEach((input, index) => {
    const label = labels[index]; // Get the corresponding label
    if (input.checked) {
      label.style.fontWeight = "bold"; // Make the checked one bold
    } else {
      label.style.fontWeight = "normal"; // Reset the others to normal
    }
  });

  // Update the building prices based on the selected amount
  populateBuildingShop(); // Trigger the price update here
};

// Add event listeners to all radio inputs
radioInputs.forEach((input) => {
  // Use 'change' event to detect radio button selection
  input.addEventListener("change", updateLabelStyles);
});

// Call the function once on load to ensure the correct label is bold initially
updateLabelStyles();

let upgradeTouched = null; // To store the upgrade currently in the "hover" state

const showUpgradeInfoMobile = (upgrade, upgradeDiv) => {
  if (upgradeTouched === upgradeDiv) {
    // If the same upgrade is touched again, try to buy it
    if (buds >= upgrade.cost) {
      buyUpgrade(upgrade); // Buy if affordable
      removeUpgradeInfo(); // Remove hover state after purchase
    } else {
      removeUpgradeInfo(); // Just remove hover state if can't afford
    }
    upgradeTouched = null; // Reset touched state
  } else {
    // If it's a new upgrade, show info and set it to the touched state
    removeUpgradeInfo(); // Clear any existing hover state

    const upgradeInfo = document.createElement("div");
    upgradeInfo.classList.add("upgrade-info");

    upgradeInfo.innerHTML = `
      <div class="info-title">
        <div class="info-title-left">
          <img src="./assets/img/${upgrade.name.replace(
            /\s+/g,
            ""
          )}.png" alt="${upgrade.name}" />
          <div class="info-title-text">
            <h3>${upgrade.name}</h3>
            <div class="upgrade-tag">upgrade</div>
          </div>
        </div>
        <p class="upgrade-cost"><span id="cost">${upgrade.cost.toLocaleString()}</span> B.</p>
      </div>
      <p id="upgrade-text">${upgrade.desc}</p>
    `;

    document.body.appendChild(upgradeInfo); // Append the info outside the upgrade row

    upgradeTouched = upgradeDiv; // Set the current upgrade to the touched state
  }
};
const populateUpgradeRow = () => {
  upgradeRowElement.innerHTML = ""; // Clear existing upgrades

  upgrades.forEach((upgrade) => {
    if (
      upgrade.shown ||
      (typeof upgrade.showAt === "function"
        ? upgrade.showAt()
        : buds >= upgrade.showAt)
    ) {
      upgrade.shown = true;

      if (!upgrade.owned) {
        const upgradeDiv = document.createElement("div");
        upgradeDiv.classList.add("upgrade");
        upgradeDiv.id = upgrade.name.replace(/\s+/g, "");

        const img = document.createElement("img");
        img.src = `./assets/img/${upgrade.name.replace(/\s+/g, "")}.png`;
        img.alt = upgrade.name;

        upgradeDiv.appendChild(img);
        upgradeRowElement.appendChild(upgradeDiv);

        if (buds < upgrade.cost) {
          upgradeDiv.classList.add("disabled");
          upgradeDiv.style.filter = "grayscale(100%)";
        } else {
          upgradeDiv.classList.remove("disabled");
          upgradeDiv.style.filter = "none";
        }

        // Handle touch for mobile devices
        upgradeDiv.addEventListener(
          "touchstart",
          (e) => {
            if (e.cancelable) {
              e.preventDefault(); // Prevents double-tap zoom on mobile
            }
            showUpgradeInfoMobile(upgrade, upgradeDiv); // Show the upgrade info
          },
          { passive: false }
        );

        // Handle mouse hover for desktop
        upgradeDiv.addEventListener("mouseover", () => {
          showUpgradeInfo(upgrade); // Show the info always
        });

        upgradeDiv.addEventListener("mouseout", () => {
          removeUpgradeInfo();
        });
      }
    }
  });
};

// Function to show upgrade information on hover
const showUpgradeInfo = (upgrade) => {
  removeUpgradeInfo(); // Clear any existing info

  const upgradeInfo = document.createElement("div");
  upgradeInfo.classList.add("upgrade-info");

  upgradeInfo.innerHTML = `
    <div class="info-title">
      <div class="info-title-left">
        <img src="./assets/img/${upgrade.name.replace(/\s+/g, "")}.png" alt="${
    upgrade.name
  }" />
        <div class="info-title-text">
          <h3>${upgrade.name}</h3>
          <div class="upgrade-tag">upgrade</div>
        </div>
      </div>
      <p class="upgrade-cost"><span id="cost">${upgrade.cost.toLocaleString()}</span> B.</p> <!-- Format upgrade cost with thousands separator -->
    </div>
    <p id="upgrade-text">${upgrade.desc}</p>
  `;

  upgradeRowElement.appendChild(upgradeInfo);
};

// Function to remove the hover/upgrade info
const removeUpgradeInfo = () => {
  const upgradeInfo = document.querySelector(".upgrade-info");
  if (upgradeInfo) {
    upgradeInfo.remove(); // Remove the info element from the DOM
  }
  upgradeTouched = null; // Reset the touched state
};

// Add event listener to close hover state when clicking outside the upgrade area
document.addEventListener("click", (event) => {
  // Check if the click is outside any upgrade element and close the hover state
  if (!event.target.closest(".upgrade") && upgradeTouched !== null) {
    removeUpgradeInfo(); // Remove hover state if clicking outside
  }
});

// Global function to calculate total buildings bought
const totalBuildingsBought = () => {
  if (!buildings || buildings.length === 0) {
    return 0; // Return 0 if buildings array is undefined or empty
  }
  let total = 0;
  buildings.forEach((building) => {
    total += building.amount;
  });
  return total;
};

const stats = {
  basicStats: {
    allTimeBuds: 0,
    allTimeClicks: 0,
    currBudsPerClick: budsPerClick,
  },
  buildingStats: {
    buildingsOwned: () =>
      buildings.filter((building) => building.amount > 0).length,
    mostPopularBuilding: () => {
      const mostPopular = buildings.reduce((mostPopular, currentBuilding) => {
        return currentBuilding.amount > mostPopular.amount
          ? currentBuilding
          : mostPopular;
      }, buildings[0]);

      return mostPopular.name;
    },
  },
  upgradeStats: {
    upgradesOwned: () => upgrades.filter((upgrade) => upgrade.owned).length,
    bestUpgrade: "",
  },
  miscStats: {
    totalPlaytime: 0,
    totalBudsFromBuildings: 0,
    budsFromClicks: 0,
    clicksPerSecond: 0,
  },
  funStats: {
    totalBudsSmoked: 0,
    timesStoned: "",
    totalRevenueGenerated: () =>
      "$" +
      Math.floor((stats.basicStats.allTimeBuds / 80) * 250).toLocaleString(),
  },
};

const statElements = {
  allTimeBuds: document.getElementById("totalBuds"),
  allTimeClicks: document.getElementById("totalClicks"),
  currBudsPerSecond: document.getElementById("currentBps"),
  currBudsPerClick: document.getElementById("currentBpc"),
  buildingsOwned: document.getElementById("totalBuildingsOwned"),
  mostPopularBuilding: document.getElementById("mostPopularBuilding"),
  upgradesOwned: document.getElementById("totalUpgradesAcquired"),
  bestUpgrade: document.getElementById("bestUpgrade"),
  totalPlaytime: document.getElementById("totalPlaytime"),
  totalBudsFromBuildings: document.getElementById("totalBudsFromBuildings"),
  budsFromClicks: document.getElementById("budsByClicking"),
  totalBuildingsBought: document.getElementById("totalBuildingsBought"),
  clicksPerSecond: document.getElementById("clicksPerSecond"),
  totalBudsSmoked: document.getElementById("totalBudsSmoked"),
  timesStoned: document.getElementById("timesStoned"),
  totalRevenueGenerated: document.getElementById("totalRevenueGenerated"),
};

const updateStats = () => {
  statElements.allTimeBuds.textContent = Math.floor(
    stats.basicStats.allTimeBuds
  ).toLocaleString();
  statElements.allTimeClicks.textContent = stats.basicStats.allTimeClicks;
  statElements.currBudsPerSecond.textContent = budsPerSecond.toFixed(2);
  statElements.currBudsPerClick.textContent = stats.basicStats.currBudsPerClick;
  statElements.buildingsOwned.textContent =
    stats.buildingStats.buildingsOwned();
  statElements.mostPopularBuilding.textContent =
    stats.buildingStats.mostPopularBuilding();
  statElements.upgradesOwned.textContent = stats.upgradeStats.upgradesOwned();
  statElements.bestUpgrade.textContent = stats.upgradeStats.bestUpgrade;
  statElements.totalPlaytime.textContent = formatPlaytime(
    stats.miscStats.totalPlaytime
  );
  statElements.totalBudsFromBuildings.textContent = Math.floor(
    stats.miscStats.totalBudsFromBuildings
  ).toLocaleString();
  statElements.budsFromClicks.textContent = stats.miscStats.budsFromClicks;

  // Update total buildings bought using the global function
  statElements.totalBuildingsBought.textContent = totalBuildingsBought(); // Call the global function here

  // Update clicks per second
  statElements.clicksPerSecond.textContent = calculateClicksPerSecond();

  statElements.totalBudsSmoked.textContent = Math.floor(
    stats.funStats.totalBudsSmoked
  ).toLocaleString();
  statElements.timesStoned.textContent = stats.funStats.timesStoned;
  statElements.totalRevenueGenerated.textContent =
    stats.funStats.totalRevenueGenerated();
};

const statUpdateLoop = () => {
  setInterval(() => {
    updateStats();
  }, 1000); // Update every second
};

// Start the stat update loop

statUpdateLoop();

const shopUpdateLoop = () => {
  setInterval(() => {
    populateBuildingShop();
    populateUpgradeRow();
  }, 1000); // Update every second to check conditions
};

// Start the shop update loop
shopUpdateLoop();

// Load saved game on startup
window.onload = () => {
  loadGame();
  bpsFunction(); // Start the buds-per-second function
  playtimeFunction(); // Start tracking playtime
  updateLabelStyles(); // Update the label styles on load
};
