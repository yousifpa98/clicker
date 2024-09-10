
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
      showAt: () => buildings[2].amount >= 2,
      shown: false,
    },
    {
      name: "Weed Water",
      cost: 1000,
      multiplier: 2,
      effects: ["Weed Factory"],
      desc: "Double the production of all Weed Factories",
      owned: false,
      showAt: () => buildings[3].amount >= 4,
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
    },
    {
      name: "Grow Lights",
      cost: 15000,
      multiplier: 3,
      effects: ["Weed Plant"],
      desc: "Triple the yield from your Weed Plants with better lighting.",
      owned: false,
      showAt: () => buildings[0].amount >= 5,
      shown: false,
    },
    {
      name: "Nutrient Solution",
      cost: 30000,
      multiplier: 2,
      effects: ["Hydroponic Bunker"],
      desc: "Boost production in the Hydroponic Bunkers.",
      owned: false,
      showAt: () => buildings[5].amount >= 2,
      shown: false,
    },
    {
      name: "VIP Clients",
      cost: 100000,
      multiplier: 2,
      effects: ["Cannabis Cathedral"],
      desc: "Double the sales from your Cannabis Cathedral thanks to some high-profile visitors.",
      owned: false,
      showAt: () => buildings[8].amount >= 3,
      shown: false,
    },
    {
      name: "Electric Grinder",
      cost: 5000,
      multiplier: 2,
      effects: ["Stoner's Den"],
      desc: "Automated grinding means faster roll-ups and more buds consumed.",
      owned: false,
      showAt: () => buildings[5].amount >= 5,
      shown: false,
    },
    {
      name: "Green-Energy Powered",
      cost: 250000,
      multiplier: 4,
      effects: ["Budzooka Dispensary"],
      desc: "The dispensary now runs on green energy—literally—boosting profits and production.",
      owned: false,
      showAt: () => buildings[9].amount >= 2,
      shown: false,
    },
    {
      name: "Felix's Special Bowl",
      cost: 1000000,
      multiplier: 3,
      effects: ["Stoner's Den"],
      desc: "We all have this one friend who brings the good stuff. Felix is that friend.",
      owned: false,
      showAt: () => buildings[5].amount >= 10,
      shown: false,
    },
    {
      name: "Guerilla Support",
      cost: 500000,
      multiplier: 1.15,
      effects: ["Narco Routes"],
      desc: "Local guerilla groups help you transport your product faster and safer.",
      owned: false,
      showAt: () => buildings[10].amount >= 1,
      shown: false,
    }
];