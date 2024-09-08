let buds = 0;
const budsElement = document.getElementById("buds");

const clickerElement = document.getElementById("clicker");

clickerElement.addEventListener("click", () => {
  buds++;
  budsElement.innerText = buds;
});

let budsPerSecond = 0;
const bpsElement = document.getElementById("bps");
bpsElement.innerText = budsPerSecond;

const bpsFunction = async () => {
    const interval = 100; // 100ms interval for smoother growth
  
    while (true) {
      const incrementPerInterval = budsPerSecond / (1000 / interval); // Calculate increment based on updated budsPerSecond
      buds += incrementPerInterval;
      budsElement.innerText = Math.floor(buds); // Update the buds display
      await new Promise((r) => setTimeout(r, interval)); // Wait 100 milliseconds
    }
  };
  



const buildings = [
  {
    name: "Weed Plant",
    cost: 10,
    bps: 1,
    amount: 0,
  },
  {
    name: "Weed Farm",
    cost: 100,
    bps: 10,
    amount: 0,
  },
  {
    name: "Weed Factory",
    cost: 1000,
    bps: 100,
    amount: 0,
  },
];

const buildingShopElement = document.getElementById("building-shop");

const populateBuildingShop = (arr) => {
  arr.forEach((building) => {
    // Create the main div element
    const buildingDiv = document.createElement("div");
    buildingDiv.classList.add("building");

    // Set the ID (remove spaces and lowercase the building name)
    buildingDiv.id = building.name.replace(/\s+/g, "");

    // Create the building-left div
    const buildingLeftDiv = document.createElement("div");
    buildingLeftDiv.classList.add("building-left");

    // Create the image element
    const img = document.createElement("img");
    img.src = `./assets/img/${building.name.replace(/\s+/g, "")}.png`;
    img.alt = building.name;

    // Create the title div and its contents (h3 and cost)
    const titleDiv = document.createElement("div");
    titleDiv.classList.add("title");

    const h3 = document.createElement("h3");
    h3.textContent = building.name;

    const pCost = document.createElement("p");
    pCost.id = building.name.replace(/\s+/g, "") + "-cost"; // Unique cost ID
    pCost.textContent = building.cost;

    // Append h3 and cost to the title div
    titleDiv.appendChild(h3);
    titleDiv.appendChild(pCost);

    // Append the image and title div to the building-left div
    buildingLeftDiv.appendChild(img);
    buildingLeftDiv.appendChild(titleDiv);

    // Create the inventory paragraph
    const inventoryP = document.createElement("p");
    inventoryP.id = building.name.replace(/\s+/g, "") + "-inventory"; // Unique inventory ID
    inventoryP.classList.add("inventory"); // Add inventory class for styling
    inventoryP.textContent = building.amount;

    // Append the building-left div and inventory paragraph to the main building div
    buildingDiv.appendChild(buildingLeftDiv);
    buildingDiv.appendChild(inventoryP);

    // Finally, append the whole buildingDiv to the building shop element
    buildingShopElement.appendChild(buildingDiv);

    // Add the event listener here after creating the element
    buildingDiv.addEventListener("click", () => {
      buyBuilding(building); // Pass the current building to the buy function
    });
  });
};

const updatePrice = (building) => {
  building.cost = Math.floor(building.cost * 1.3);
};

// Updated buyBuilding logic
const buyBuilding = (building) => {
  if (buds >= building.cost) {
    buds -= building.cost; // Deduct the cost
    budsPerSecond += building.bps; // Increase buds per second
    bpsElement.innerText = budsPerSecond; // Update buds per second in the DOM
    building.amount++; // Increment the number of buildings owned

    // Update the inventory and cost in the DOM
    document.getElementById(
      building.name.replace(/\s+/g, "") + "-inventory"
    ).innerText = building.amount;
    updatePrice(building); // Update the price
    document.getElementById(
      building.name.replace(/\s+/g, "") + "-cost"
    ).innerText = building.cost;
  } else {
    alert("Not enough buds!"); // Alert if not enough buds
  }
};

// Call the function to populate the building shop
populateBuildingShop(buildings);

const upgrades = [
  {
    name: "Weed Seeds",
    cost: 100,
    multiplier: 2,
    desc: "Double the production of all Weed Plants",
    owned: false,
  },
  {
    name: "Weed Fertilizer",
    cost: 500,
    multiplier: 2,
    desc: "Double the production of all Weed Farms",
    owned: false,
  },
  {
    name: "Weed Water",
    cost: 1000,
    multiplier: 2,
    desc: "Double the production of all Weed Factories",
    owned: false,
  },
];

const upgradeRowElement = document.getElementById("upgrade-row");

const populateUpgradeRow = (arr) => {
  arr.forEach((upgrade, index) => {
    // Create the main div element for the upgrade
    const upgradeDiv = document.createElement("div");
    upgradeDiv.classList.add("upgrade");

    // Set the ID (use the name, remove spaces and lowercase it)
    upgradeDiv.id = upgrade.name.replace(/\s+/g, "") + index;

    // Create the image element
    const img = document.createElement("img");
    img.src = `./assets/img/${upgrade.name.replace(/\s+/g, "")}.png`;
    img.alt = upgrade.name;

    // Append the image to the upgrade div
    upgradeDiv.appendChild(img);

    // Append the upgrade div to the upgrade row
    upgradeRowElement.appendChild(upgradeDiv);

    // Optional: You could also add event listeners to handle clicking on upgrades
    upgradeDiv.addEventListener("click", () => {
      console.log(`Upgrade clicked: ${upgrade.name}`);
      // Handle the purchase logic here
    });
  });
};

// Call the function to populate the upgrade row
populateUpgradeRow(upgrades);
bpsFunction();