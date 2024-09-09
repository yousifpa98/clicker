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

const buildings = [
  {
    name: "Weed Plant",
    cost: 10,
    bps: 1,
    amount: 0,
    showAt: 0,
    shown: false,
  },
  {
    name: "Weed Farm",
    cost: 100,
    bps: 10,
    amount: 0,
    showAt: 9,
    shown: false,
  },
  {
    name: "Weed Factory",
    cost: 1000,
    bps: 100,
    amount: 0,
    showAt: 90,
    shown: false,
  },
];

const buildingShopElement = document.getElementById("building-shop");

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

      // Apply greyscale filter and disable if not enough buds
      if (buds < building.cost) {
        buildingDiv.classList.add("disabled"); // Add class for greyscale
        buildingDiv.style.filter = "grayscale(100%)";
        buildingDiv.style.pointerEvents = "none"; // Disable click
      } else {
        buildingDiv.classList.remove("disabled");
        buildingDiv.style.filter = "none";
        buildingDiv.style.pointerEvents = "auto"; // Enable click
      }

      buildingDiv.addEventListener("click", () => {
        buyBuilding(building);
      });
    }
  });
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
  }
};

const upgrades = [
  {
    name: "Weed Seeds",
    cost: 100,
    multiplier: 2,
    effects: ["Weed Plant"],
    desc: "Double the production of all Weed Plants",
    owned: false,
    showAt: () => buildings[0].amount >= 1,
    shown: false,
  },
  {
    name: "Weed Fertilizer",
    cost: 500,
    multiplier: 2,
    effects: ["Weed Farm"],
    desc: "Double the production of all Weed Farms",
    owned: false,
    showAt: () => buildings[1].amount >= 2,
    shown: false,
  },
  {
    name: "Weed Water",
    cost: 1000,
    multiplier: 2,
    effects: ["Weed Factory"],
    desc: "Double the production of all Weed Factories",
    owned: false,
    showAt: () => buildings[2].amount >= 4,
    shown: false,
  },
  {
    name: "Cocaine for the workers",
    cost: 10000,
    multiplier: 2,
    effects: "budsPerSecond",
    desc: "Increases your overall bud production",
    owned: false,
    showAt: 9500,
    shown: false,
  }
];

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

// Function to populate upgrades based on showAt condition
const populateUpgradeRow = () => {
  upgradeRowElement.innerHTML = ""; // Clear existing upgrades

  upgrades.forEach((upgrade) => {
    if (upgrade.shown || (typeof upgrade.showAt === "function" ? upgrade.showAt() : buds >= upgrade.showAt)) {
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
          upgradeDiv.style.pointerEvents = "none";
        } else {
          upgradeDiv.classList.remove("disabled");
          upgradeDiv.style.filter = "none";
          upgradeDiv.style.pointerEvents = "auto";
        }

        upgradeDiv.addEventListener("click", () => {
          buyUpgrade(upgrade);
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

const showUpgradeInfo = (upgrade) => {
  removeUpgradeInfo();

  const upgradeInfo = document.createElement("div");
  upgradeInfo.classList.add("upgrade-info");

  upgradeInfo.innerHTML = `
    <div class="info-title">
      <div class="info-title-left">
        <img src="./assets/img/click_img.png" alt="${upgrade.name}" />
        <div class="info-title-text">
          <h3>${upgrade.name}</h3>
          <div class="upgrade-tag">upgrade</div>
        </div>
      </div>
      <p class="upgrade-cost"><span id="cost">${upgrade.cost}</span> B.</p>
    </div>
    <p id="upgrade-text">${upgrade.desc}</p>
  `;

  upgradeRowElement.appendChild(upgradeInfo);
};

const removeUpgradeInfo = () => {
  const upgradeInfo = document.querySelector(".upgrade-info");
  if (upgradeInfo) {
    upgradeInfo.remove();
  }
};

// Populate upgrades initially
populateUpgradeRow(upgrades);

bpsFunction();