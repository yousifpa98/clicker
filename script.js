
let buds = 0;
const budsElement = document.getElementById("buds");

const clickerElement = document.getElementById("clicker");

clickerElement.addEventListener("click", () => {
  buds++;
  budsElement.innerText = Math.floor(buds); // Ensure buds are shown as integers
});

let budsPerSecond = 0;
const bpsElement = document.getElementById("bps");
bpsElement.innerText = budsPerSecond;

const bpsFunction = async () => {
  const interval = 100; // 100ms interval for smoother growth

  while (true) {
    const incrementPerInterval = budsPerSecond / (1000 / interval); // Calculate increment based on updated budsPerSecond
    buds += incrementPerInterval;
    budsElement.innerText = Math.floor(buds); // Display as integer
    await new Promise((r) => setTimeout(r, interval)); // Wait 100 milliseconds
  }
};

const buildingShopElement = document.getElementById("building-shop");

// Function to save the current game state to localStorage
const saveGame = () => {
  const gameData = {
    buds: buds,
    budsPerSecond: budsPerSecond,
    buildings: buildings,
    upgrades: upgrades,
  };
  localStorage.setItem("weedClickerSave", JSON.stringify(gameData));
};

// Save the game every 30 seconds
setInterval(saveGame, 30000);

// Function to load the game state from localStorage
const loadGame = () => {
  const savedGame = localStorage.getItem("weedClickerSave");

  if (savedGame) {
    const gameData = JSON.parse(savedGame);
    buds = gameData.buds || 0;
    budsPerSecond = gameData.budsPerSecond || 0;

    // Restore building progress
    if (gameData.buildings) {
      gameData.buildings.forEach((savedBuilding, index) => {
        buildings[index].amount = savedBuilding.amount;
        buildings[index].cost = savedBuilding.cost;
        buildings[index].shown = savedBuilding.shown;
      });
    }

    // Restore upgrade progress
    if (gameData.upgrades) {
      gameData.upgrades.forEach((savedUpgrade, index) => {
        upgrades[index].owned = savedUpgrade.owned;
        upgrades[index].shown = savedUpgrade.shown;
      });
    }

    // Update the UI to reflect the loaded state
    budsElement.innerText = Math.floor(buds);
    bpsElement.innerText = budsPerSecond;
    populateBuildingShop();
    populateUpgradeRow();
  }
};

const updatePrice = (building) => {
  building.cost = Math.floor(building.cost * 1.3);
};

const buyBuilding = (building) => {
  if (buds >= building.cost) {
    buds -= building.cost;
    budsPerSecond += building.bps;
    bpsElement.innerText = budsPerSecond;
    building.amount++;

    document.getElementById(
      building.name.replace(/\s+/g, "") + "-inventory"
    ).innerText = building.amount;
    updatePrice(building);
    document.getElementById(
      building.name.replace(/\s+/g, "") + "-cost"
    ).innerText = building.cost;

    saveGame(); // Save the game after each purchase
  }
};

let globalBpsMultiplier = 1;

const buyUpgrade = (upgrade) => {
  if (buds >= upgrade.cost) {
    buds -= upgrade.cost;
    budsElement.innerText = Math.floor(buds);
    upgrade.owned = true;

    if (Array.isArray(upgrade.effects)) {
      upgrade.effects.forEach((effect) => {
        const building = buildings.find((b) => b.name === effect);
        if (building) {
          building.bps *= upgrade.multiplier;
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
  bpsElement.innerText = budsPerSecond;
};

const upgradeRowElement = document.getElementById("upgrade-row");

// Function to populate buildings based on showAt condition
const populateBuildingShop = () => {
  buildingShopElement.innerHTML = ""; // Clear the shop

  buildings.forEach((building) => {
    if (building.shown || buds >= building.showAt) {
      building.shown = true;

      const buildingDiv = document.createElement("div");
      buildingDiv.classList.add("building");

      buildingDiv.id = building.name.replace(/\s+/g, "");

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
      pCost.textContent = building.cost;

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

      // Apply greyscale filter but allow hover
      if (buds < building.cost) {
        buildingDiv.classList.add("disabled");
        buildingDiv.style.filter = "grayscale(100%)";
      } else {
        buildingDiv.classList.remove("disabled");
        buildingDiv.style.filter = "none";
      }

      buildingDiv.addEventListener("click", () => {
        if (buds >= building.cost) {
          buyBuilding(building);
        }
      });
    }
  });
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

        upgradeDiv.addEventListener("click", () => {
          if (buds >= upgrade.cost) {
            buyUpgrade(upgrade);
          }
        });
      }
    }
  });
};

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
};