const stats = {
  basicStats: {
    allTimeBuds: 0,
    allTimeClicks: 0,
    currBudsPerSecond: budsPerSecond,
    currBudsPerClick: 0,
  },
  buildingStats: {
    buildingsOwned: 0,
    mostPopularBuilding: "",
  },
  upgradeStats: {
    upgradesOwned: 0,
    bestUpgrade: "",
  },
  miscStats: {
    totalPlaytime: 0,
    totalBudsFromBuildings: 0,
    budsFromClicks: 0,
    totalBuildingsBought: 0,
    clicksPerSecond: 0,
  },
  funStats: {
    totalBudsSmoked: 0,
    timesStoned: "",
    totalRevenueGenerated: () => "$ " + (stats.allTimeBuds / 80) * 250,
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
  statElements.allTimeBuds.textContent = stats.basicStats.allTimeBuds;
  statElements.allTimeClicks.textContent = stats.basicStats.allTimeClicks;
  statElements.currBudsPerSecond.textContent =
    stats.basicStats.currBudsPerSecond;
  statElements.currBudsPerClick.textContent = stats.basicStats.currBudsPerClick;
  statElements.buildingsOwned.textContent = stats.buildingStats.buildingsOwned;
  statElements.mostPopularBuilding.textContent =
    stats.buildingStats.mostPopularBuilding;
  statElements.upgradesOwned.textContent = stats.upgradeStats.upgradesOwned;
  statElements.bestUpgrade.textContent = stats.upgradeStats.bestUpgrade;
  statElements.totalPlaytime.textContent = stats.miscStats.totalPlaytime;
  statElements.totalBudsFromBuildings.textContent =
    stats.miscStats.totalBudsFromBuildings;
  statElements.budsFromClicks.textContent = stats.miscStats.budsFromClicks;
  statElements.totalBuildingsBought.textContent =
    stats.miscStats.totalBuildingsBought;
  statElements.clicksPerSecond.textContent = stats.miscStats.clicksPerSecond;
  statElements.totalBudsSmoked.textContent = stats.funStats.totalBudsSmoked;
  statElements.timesStoned.textContent = stats.funStats.timesStoned;
  statElements.totalRevenueGenerated.textContent =
    stats.funStats.totalRevenueGenerated();
};




