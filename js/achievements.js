const achievements = [
  // General Achievements
  {
    name: "Blaze It!",
    description: "Reach 420 buds per second.",
    imagePath: "./assets/img/webp/achievements/blaze_it.webp",
    unlocked: function () {
      return budsPerSecond >= 420;
    },
  },
  {
    name: "The Grass is Greener",
    description: "Earn your first 1,000,000 buds.",
    imagePath: "./assets/img/webp/achievements/the_grass_is_greener.webp",
    unlocked: function () {
      return stats.basicStats.allTimeBuds >= 1000000;
    },
  },
  {
    name: "Budding Entrepreneur",
    description: "Buy your first building.",
    imagePath: "./assets/img/webp/achievements/budding_entrepreneur.webp",
    unlocked: function () {
      return buildings.some((building) => building.amount > 0);
    },
  },
  {
    name: "Up in Smoke",
    description: "Spend 1,000,000 buds in a single session.",
    imagePath: "./assets/img/webp/achievements/up_in_smoke.webp",
    unlocked: function () {
      return stats.miscStats.totalBudsFromBuildings >= 1000000;
    },
  },
  {
    name: "Joint Effort",
    description: "Have 50 Weed Plants.",
    imagePath: "./assets/img/webp/achievements/joint_effort.webp",
    unlocked: function () {
      const weedPlant = buildings.find(
        (building) => building.name === "Weed Plant"
      );
      return weedPlant && weedPlant.amount >= 50;
    },
  },
  {
    name: "Blunt Business",
    description: "Reach 100 buds per second.",
    imagePath: "./assets/img/webp/achievements/blunt_business.webp",
    unlocked: function () {
      return budsPerSecond >= 100;
    },
  },
  {
    name: "High Roller",
    description: "Spend over 10,000,000 buds in upgrades.",
    imagePath: "./assets/img/webp/achievements/high_roller.webp",
    unlocked: function () {
      return stats.miscStats.totalBudsFromBuildings >= 10000000;
    },
  },
  {
    name: "Strain Connoisseur",
    description: "Unlock 5 different upgrades related to your plants.",
    imagePath: "./assets/img/webp/achievements/strain_connoisseur.webp",
    unlocked: function () {
      const plantUpgrades = upgrades.filter(
        (upgrade) => upgrade.effects.includes("Weed Plant") && upgrade.owned
      );
      return plantUpgrades.length >= 5;
    },
  },
  {
    name: "Weed Kingpin",
    description: "Own 5 Weed Labs.",
    imagePath: "./assets/img/webp/achievements/weed_kingpin.webp",
    unlocked: function () {
      const weedLab = buildings.find(
        (building) => building.name === "Weed Lab"
      );
      return weedLab && weedLab.amount >= 5;
    },
  },

  // Building-Specific Achievements
  {
    name: "Garage Farmer",
    description: "Purchase 10 Underground Garages.",
    imagePath: "./assets/img/webp/achievements/garage_farmer.webp",
    unlocked: function () {
      const garage = buildings.find(
        (building) => building.name === "Underground Garage"
      );
      return garage && garage.amount >= 10;
    },
  },
  {
    name: "Farm Fresh",
    description: "Own 10 Weed Farms.",
    imagePath: "./assets/img/webp/achievements/farm_fresh.webp",
    unlocked: function () {
      const farm = buildings.find((building) => building.name === "Weed Farm");
      return farm && farm.amount >= 10;
    },
  },
  {
    name: "Factory of Dreams",
    description: "Purchase your first Weed Factory.",
    imagePath: "./assets/img/webp/achievements/factory_of_dreams.webp",
    unlocked: function () {
      const factory = buildings.find(
        (building) => building.name === "Weed Factory"
      );
      return factory && factory.amount >= 1;
    },
  },
  {
    name: "Lab Rat",
    description: "Own 5 Weed Labs.",
    imagePath: "./assets/img/webp/achievements/lab_rat.webp",
    unlocked: function () {
      const lab = buildings.find((building) => building.name === "Weed Lab");
      return lab && lab.amount >= 5;
    },
  },
  {
    name: "Higher Power",
    description: "Own the Cannabis Cathedral.",
    imagePath: "./assets/img/webp/achievements/higher_power.webp",
    unlocked: function () {
      const cathedral = buildings.find(
        (building) => building.name === "Cannabis Cathedral"
      );
      return cathedral && cathedral.amount >= 1;
    },
  },
  {
    name: "Den of Stoners",
    description: "Own 10 Stoner's Dens.",
    imagePath: "./assets/img/webp/achievements/den_of_stoners.webp",
    unlocked: function () {
      const stonersDen = buildings.find(
        (building) => building.name === "Stoner's Den"
      );
      return stonersDen && stonersDen.amount >= 10;
    },
  },
  {
    name: "Budzooka Tycoon",
    description: "Own 5 Budzooka Dispensaries.",
    imagePath: "./assets/img/webp/achievements/budzooka_tycoon.webp",
    unlocked: function () {
      const budzooka = buildings.find(
        (building) => building.name === "Budzooka Dispensary"
      );
      return budzooka && budzooka.amount >= 5;
    },
  },
  {
    name: "Empire Builder",
    description: "Unlock the Underground Cannabis Empire.",
    imagePath: "./assets/img/webp/achievements/empire_builder.webp",
    unlocked: function () {
      const empire = buildings.find(
        (building) => building.name === "Underground Cannabis Empire"
      );
      return empire && empire.amount >= 1;
    },
  },

  // Upgrade-Specific Achievements
  {
    name: "Seed Money",
    description: "Purchase the 'Better Seeds' upgrade.",
    imagePath: "./assets/img/webp/achievements/seed_money.webp",
    unlocked: function () {
      const upgrade = upgrades.find(
        (upgrade) => upgrade.name === "Better Seeds"
      );
      return upgrade && upgrade.owned;
    },
  },
  {
    name: "Buzz Kill",
    description: "Purchase the 'Cocaine for the Workers' upgrade.",
    imagePath: "./assets/img/webp/achievements/buzz_kill.webp",
    unlocked: function () {
      const upgrade = upgrades.find(
        (upgrade) => upgrade.name === "Cocaine for the Workers"
      );
      return upgrade && upgrade.owned;
    },
  },
  {
    name: "Green Energy Master",
    description: "Purchase the 'Green-Energy Powered' upgrade.",
    imagePath: "./assets/img/webp/achievements/green_energy_master.webp",
    unlocked: function () {
      const upgrade = upgrades.find(
        (upgrade) => upgrade.name === "Green-Energy Powered"
      );
      return upgrade && upgrade.owned;
    },
  },
  {
    name: "Celebrity Endorsement",
    description: "Purchase the 'Cheech and Chong Endorsement' upgrade.",
    imagePath: "./assets/img/webp/achievements/celebrity_endorsement.webp",
    unlocked: function () {
      const upgrade = upgrades.find(
        (upgrade) => upgrade.name === "Cheech and Chong Endorsement"
      );
      return upgrade && upgrade.owned;
    },
  },
  {
    name: "Munchie Mogul",
    description: "Buy the '420 Special Sale' upgrade for the Munchies Factory.",
    imagePath: "./assets/img/webp/achievements/munchie_mogul.webp",
    unlocked: function () {
      const upgrade = upgrades.find(
        (upgrade) => upgrade.name === "420 Special Sale"
      );
      return upgrade && upgrade.owned;
    },
  },
  {
    name: "Master of the Munchies",
    description: "Purchase 'The Munchies King' upgrade.",
    imagePath: "./assets/img/webp/achievements/master_of_the_munchies.webp",
    unlocked: function () {
      const upgrade = upgrades.find(
        (upgrade) => upgrade.name === "The Munchies King"
      );
      return upgrade && upgrade.owned;
    },
  },
  {
    name: "Bong Master",
    description: "Purchase the 'Extreme Vaporizer' upgrade.",
    imagePath: "./assets/img/webp/achievements/bong_master.webp",
    unlocked: function () {
      const upgrade = upgrades.find(
        (upgrade) => upgrade.name === "Extreme Vaporizer"
      );
      return upgrade && upgrade.owned;
    },
  },
  {
    name: "Guerilla Tactics",
    description: "Purchase the 'Guerilla Support' upgrade for Narco Routes.",
    imagePath: "./assets/img/webp/achievements/guerilla_tactics.webp",
    unlocked: function () {
      const upgrade = upgrades.find(
        (upgrade) => upgrade.name === "Guerilla Support"
      );
      return upgrade && upgrade.owned;
    },
  },

  // Fun, Click-Based Achievements
  {
    name: "Click Commander",
    description: "Click 500 times.",
    imagePath: "./assets/img/webp/achievements/click_commander.webp",
    unlocked: function () {
      return stats.basicStats.allTimeClicks >= 500;
    },
  },
  {
    name: "Sticky Fingers",
    description: "Collect 1,000 buds from clicks.",
    imagePath: "./assets/img/webp/achievements/sticky_fingers.webp",
    unlocked: function () {
      return stats.miscStats.budsFromClicks >= 1000;
    },
  },
  {
    name: "Cheeto Fingers",
    description: "Collect 5,000 buds from clicks.",
    imagePath: "./assets/img/webp/achievements/cheeto_fingers.webp",
    unlocked: function () {
      return stats.miscStats.budsFromClicks >= 5000;
    },
  },
  {
    name: "One Hit Wonder",
    description: "Collect 100,000 buds from clicks.",
    imagePath: "./assets/img/webp/achievements/one_hit_wonder.webp",
    unlocked: function () {
      return stats.miscStats.budsFromClicks >= 100000;
    },
  },
  {
    name: "Blunt Force Trauma",
    description: "Reach 10,000 clicks.",
    imagePath: "./assets/img/webp/achievements/blunt_force_trauma.webp",
    unlocked: function () {
      return stats.basicStats.allTimeClicks >= 10000;
    },
  },

  // Time-Based Achievements
  {
    name: "420 Blaze It",
    description: "Play the game for 420 minutes (7 hours).",
    imagePath: "./assets/img/webp/achievements/420_blaze_it.webp",
    unlocked: function () {
      return stats.miscStats.totalPlaytime >= 25200; // 420 * 60 = 25200 seconds
    },
  },
  {
    name: "Buds Before Bed",
    description: "Play the game for 12 hours straight.",
    imagePath: "./assets/img/webp/achievements/buds_before_bed.webp",
    unlocked: function () {
      return stats.miscStats.totalPlaytime >= 43200; // 12 hours * 60 * 60
    },
  },
  {
    name: "Eternal Session",
    description: "Keep the game running for 24 hours.",
    imagePath: "./assets/img/webp/achievements/eternal_session.webp",
    unlocked: function () {
      return stats.miscStats.totalPlaytime >= 86400; // 24 hours * 60 * 60
    },
  },

  // Combo Achievements
  {
    name: "Farm and Factory Tycoon",
    description: "Own 10 Weed Farms and 5 Weed Factories.",
    imagePath: "./assets/img/webp/achievements/farm_and_factory_tycoon.webp",
    unlocked: function () {
      const farm = buildings.find((b) => b.name === "Weed Farm");
      const factory = buildings.find((b) => b.name === "Weed Factory");
      return farm.amount >= 10 && factory.amount >= 5;
    },
  },
  {
    name: "Mansion Mogul",
    description: "Own the 420 Mansion and the Stoner's Den at the same time.",
    imagePath: "./assets/img/webp/achievements/mansion_mogul.webp",
    unlocked: function () {
      const mansion = buildings.find((b) => b.name === "420 Mansion");
      const stonersDen = buildings.find((b) => b.name === "Stoner's Den");
      return mansion.amount >= 1 && stonersDen.amount >= 1;
    },
  },
  {
    name: "The High Life",
    description: "Own every building at least once.",
    imagePath: "./assets/img/webp/achievements/the_high_life.webp",
    unlocked: function () {
      return buildings.every((building) => building.amount > 0);
    },
  },
];

// Function to create and show the modal with unlocked achievements
const showUnlockedAchievements = () => {
  // Get the modal and close button elements
  const modal = document.getElementById("achivModal");
  const closeModalBtn = document.getElementById("achivModalClose");

  // Clear the previous achievements from the modal content
  const achievementList = document.getElementById("achivModalList");
  achievementList.innerHTML = "";

  // Get the elements for displaying details
  const achivName = document.getElementById("achivName");
  const achivDesc = document.getElementById("achivDesc");

  // Filter unlocked achievements
  const unlockedAchievements = achievements.filter((achievement) =>
    achievement.unlocked()
  );

  // Check if there are unlocked achievements
  if (unlockedAchievements.length === 0) {
    achievementList.innerHTML = "<p>No achievements unlocked yet!</p>";
  } else {
    // Create HTML elements for each unlocked achievement
    unlockedAchievements.forEach((achievement) => {
      const achievementDiv = document.createElement("div");
      achievementDiv.classList.add("achievement-item");

      // Achievement image
      const img = document.createElement("img");
      img.src = achievement.imagePath;
      img.alt = achievement.name;
      img.style.width = "50px"; // Adjust size to fit the modal
      img.style.height = "50px";

      // Hover effect to update details
      img.addEventListener("mouseenter", () => {
        achivName.textContent = achievement.name;
        achivDesc.textContent = achievement.description;
      });

      // Append the image to the achievement div
      achievementDiv.appendChild(img);

      // Add the achievement div to the modal list
      achievementList.appendChild(achievementDiv);
    });
  }

  // Display the modal
  modal.style.display = "flex"; // Use flex to center the modal

  // Close the modal when the user clicks the close button
  closeModalBtn.onclick = () => {
    modal.style.display = "none";
  };

  // Close the modal when the user clicks outside the modal content
  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
};

const achievmentTrigger = document.getElementById("achievementTrigger");

achievmentTrigger.addEventListener("click", showUnlockedAchievements);

const achievementTriggerMob = document.getElementById("achievementTriggerMob");

achievementTriggerMob.addEventListener("click", showUnlockedAchievements);
