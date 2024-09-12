const upgrades = [
  {
    name: "Better Seeds",
    cost: 1000,
    multiplier: 2,
    effects: ["Weed Plant"],
    desc: 'Your best friend hands you a bag of "magic seeds".',
    owned: false,
    showAt: () => buildings[0].amount >= 1,
    shown: false,
  },
  {
    name: "Weed Fertilizer",
    cost: 2000,
    multiplier: 1.25,
    effects: ["Weed Farm"],
    desc: "You invest some money in top-shelf fertilizer for a better harvest.",
    owned: false,
    showAt: () => buildings[2].amount >= 2,
    shown: false,
  },
  {
    name: "PH-Neutral Water",
    cost: 3500,
    multiplier: 1.15,
    effects: ["Weed Factory"],
    desc: "You start caring about the PH in your water and your buds start growing exponentially.",
    owned: false,
    showAt: () => buildings[3].amount >= 4,
    shown: false,
  },
  {
    name: "Cocaine for the Workers",
    cost: 100000,
    multiplier: 2,
    effects: "budsPerSecond",
    desc: "It may not be healthy, but man do they work hard on that stuff!",
    owned: false,
    showAt: 9500,
    shown: false,
  },
  {
    name: "Grow Lights",
    cost: 20000,
    multiplier: 2.5,
    effects: ["Weed Plant"],
    desc: "You finally get proper lighting for optimal yield.",
    owned: false,
    showAt: () => buildings[0].amount >= 5,
    shown: false,
  },
  {
    name: "Nutrient Solution",
    cost: 30000,
    multiplier: 1.13,
    effects: ["Hydroponic Bunker"],
    desc: "Boost production in the Hydroponic Bunkers.",
    owned: false,
    showAt: () => buildings[5].amount >= 2,
    shown: false,
  },
  {
    name: "VIP Clients",
    cost: 100000,
    multiplier: 1.2,
    effects: ["Cannabis Cathedral"],
    desc: "Multiply the production from your Cannabis Cathedral thanks to some high-profile visitors.",
    owned: false,
    showAt: () => buildings[8].amount >= 3,
    shown: false,
  },
  {
    name: "Electric Grinder",
    cost: 45000,
    multiplier: 1.12,
    effects: ["Stoner's Den"],
    desc: "Automated grinding means faster roll-ups and more buds consumed.",
    owned: false,
    showAt: () => buildings[5].amount >= 5,
    shown: false,
  },
  {
    name: "Green-Energy Powered",
    cost: 250000,
    multiplier: 1.3,
    effects: ["Budzooka Dispensary"],
    desc: "The dispensary now runs on green energy—literally—boosting profits and production.",
    owned: false,
    showAt: () => buildings[9].amount >= 2,
    shown: false,
  },
  {
    name: "Felix's Special Bowl",
    cost: 150000,
    multiplier: 2,
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
  },
  // New Upgrades
  {
    name: "Cheech and Chong Endorsement",
    cost: 500000,
    multiplier: 1.5,
    effects: ["Weed Convention Center"],
    desc: "With their backing, you’re now the face of the ultimate stoner’s empire.",
    owned: false,
    showAt: () => buildings[12].amount >= 1,
    shown: false,
  },
  {
    name: "Potent Strains",
    cost: 1000000,
    multiplier: 1.5,
    effects: ["Weed Lab"],
    desc: "You’ve bred some crazy strong strains. People can’t get enough.",
    owned: false,
    showAt: () => buildings[4].amount >= 5,
    shown: false,
  },
  {
    name: "420 Special Sale",
    cost: 2500000,
    multiplier: 1.2,
    effects: ["Munchies Factory"],
    desc: "The ultimate munchie sale! Boost factory output as sales skyrocket.",
    owned: false,
    showAt: () => buildings[7].amount >= 3,
    shown: false,
  },
  {
    name: "Celebrity Stoner Collab",
    cost: 3000000,
    multiplier: 1.25,
    effects: ["Cannabis Cathedral"],
    desc: "Snoop Dogg, Seth Rogen... they're all buying in. Production increases across the board.",
    owned: false,
    showAt: () => buildings[8].amount >= 3,
    shown: false,
  },
  {
    name: "Farm-to-Bong",
    cost: 800000,
    multiplier: 1.2,
    effects: ["Underground Garage"],
    desc: "Streamlined delivery system from farm to bong. People can't get enough.",
    owned: false,
    showAt: () => buildings[1].amount >= 7,
    shown: false,
  },
  {
    name: "Extreme Vaporizer",
    cost: 1200000,
    multiplier: 1.3,
    effects: ["Stoner's Den"],
    desc: "The latest and greatest in vaporizer technology. Get more out of each bud.",
    owned: false,
    showAt: () => buildings[5].amount >= 6,
    shown: false,
  },
  {
    name: "Grow Room Expansion",
    cost: 2000000,
    multiplier: 1.2,
    effects: ["Hydroponic Bunker"],
    desc: "You added more grow lights and more space. Time to expand your yields.",
    owned: false,
    showAt: () => buildings[6].amount >= 5,
    shown: false,
  },
  {
    name: "Super Nutrient Infusion",
    cost: 500000,
    multiplier: 1.1,
    effects: ["Cannabis Greenhouse"],
    desc: "A nutrient mix that’s making your plants thrive like never before.",
    owned: false,
    showAt: () => buildings[12].amount >= 2,
    shown: false,
  },
  {
    name: "Black Market Insider",
    cost: 6000000,
    multiplier: 1.4,
    effects: ["Underground Cannabis Empire"],
    desc: "You know the right people, and now the black market is more profitable than ever.",
    owned: false,
    showAt: () => buildings[17].amount >= 1,
    shown: false,
  },
  {
    name: "High Times Cover Story",
    cost: 5000000,
    multiplier: 1.35,
    effects: ["Weed Convention Center"],
    desc: "A feature in High Times magazine. Suddenly, you're the industry star.",
    owned: false,
    showAt: () => buildings[13].amount >= 3,
    shown: false,
  },
  {
    name: "Cloud Dispensers",
    cost: 2200000,
    multiplier: 1.2,
    effects: ["Amsterdam Coffee Shop"],
    desc: "Install automatic cloud dispensers at each table for the ultimate high.",
    owned: false,
    showAt: () => buildings[14].amount >= 5,
    shown: false,
  },
  {
    name: "Medical Weed Boom",
    cost: 8000000,
    multiplier: 1.25,
    effects: ["Medical Marijuana Clinic"],
    desc: "The medical market is booming, and your clinic is raking in the cash.",
    owned: false,
    showAt: () => buildings[15].amount >= 2,
    shown: false,
  },
  {
    name: "CBD Craze",
    cost: 12000000,
    multiplier: 1.3,
    effects: ["CBD Research Lab"],
    desc: "The CBD craze is real, and your lab is leading the way.",
    owned: false,
    showAt: () => buildings[16].amount >= 3,
    shown: false,
  },
  {
    name: "Nightclub Weed Sales",
    cost: 4000000,
    multiplier: 1.2,
    effects: ["Narco Routes"],
    desc: "You've infiltrated the nightclub scene. Time to make some big bucks under the disco ball.",
    owned: false,
    showAt: () => buildings[10].amount >= 2,
    shown: false,
  },
  {
    name: "Sticky Fingers",
    cost: 20000,
    multiplier: 2,
    effects: "budsPerClick",
    desc: "Turns out resin buildup on your fingers isn’t just gross—it’s profitable!",
    owned: false,
    showAt: () => stats.basicStats.allTimeClicks >= 500,
    shown: false,
  },
  {
    name: "Cheeto Dust Power",
    cost: 100000,
    multiplier: 1.5,
    effects: "budsPerClick",
    desc: "Your fingers are covered in Cheeto dust, adding that extra *crunch* to every click.",
    owned: false,
    showAt: () => stats.basicStats.allTimeClicks >= 2000,
    shown: false,
  },
  {
    name: "Blunt Force Trauma",
    cost: 500000,
    multiplier: 10,
    effects: "budsPerClick",
    desc: "You’ve taken so many hits, now every click hits like a blunt.",
    owned: false,
    showAt: () => stats.miscStats.budsFromClicks >= 15000,
    shown: false,
  },
  {
    name: "Stoned AF",
    cost: 1500000,
    multiplier: 4,
    effects: "budsPerClick",
    desc: "You’re so high that each click feels like a trip to the moon—and brings back double the buds.",
    owned: false,
    showAt: () => stats.basicStats.allTimeClicks >= 10000,
    shown: false,
  },
  {
    name: "Dank Dankster",
    cost: 5000000,
    multiplier: 4,
    effects: "budsPerClick",
    desc: "You’re the dankest in town, and now even your clicks are infused with that sticky icky.",
    owned: false,
    showAt: () => stats.miscStats.budsFromClicks >= 100000,
    shown: false,
  },
  {
    name: "Bong Hit Master",
    cost: 10000000,
    multiplier: 5,
    effects: "budsPerClick",
    desc: "You’ve unlocked the secret to hitting the bong *and* the mouse at the same time.",
    owned: false,
    showAt: () => stats.basicStats.allTimeClicks >= 50000,
    shown: false,
  },
  {
    name: "One Hit Wonder",
    cost: 50000000,
    multiplier: 10,
    effects: "budsPerClick",
    desc: "One click to rule them all, one click to bind them... in a cloud of smoke.",
    owned: false,
    showAt: () => stats.miscStats.budsFromClicks >= 1000000,
    shown: false,
  },
  // New Upgrades
  {
    name: "Pablo Escobar's Blessing",
    cost: 100000000,
    multiplier: 3,
    effects: ["Narco Routes"],
    desc: "Pablo himself gives you his blessing. Business is booming, and nobody dares interfere.",
    owned: false,
    showAt: () => buildings[10].amount >= 3,
    shown: false,
  },
  {
    name: "The Munchies King",
    cost: 70000000,
    multiplier: 2.5,
    effects: ["Munchies Factory"],
    desc: "You’re not just feeding the munchies—you ARE the munchies.",
    owned: false,
    showAt: () => buildings[7].amount >= 5,
    shown: false,
  },
  {
    name: "Dab Rig of Destiny",
    cost: 200000000,
    multiplier: 4,
    effects: ["Stoner's Den"],
    desc: "The ultimate dab rig, turning every hit into a massive cloud and every click into gold.",
    owned: false,
    showAt: () => buildings[5].amount >= 10,
    shown: false,
  },
  {
    name: "Bob Marley's Blessing",
    cost: 250000000,
    multiplier: 5,
    effects: ["All buildings"],
    desc: "The legendary Bob Marley himself blesses your crops. Production goes sky-high.",
    owned: false,
    showAt: () => buildings[0].amount >= 10,
    shown: false,
  },
  {
    name: "Gravity Bong Master",
    cost: 300000000,
    multiplier: 3,
    effects: ["Hydroponic Bunker"],
    desc: "Every hit feels like a trip through space, and so does your yield.",
    owned: false,
    showAt: () => buildings[6].amount >= 8,
    shown: false,
  },
  {
    name: "420 Time Traveler",
    cost: 500000000,
    multiplier: 6,
    effects: ["All production"],
    desc: "You’ve unlocked the secret to always living in the 4:20 moment, doubling your output.",
    owned: false,
    showAt: () => stats.miscStats.totalPlaytime >= 42000,
    shown: false,
  },
  {
    name: "The Ultimate Stoner Kit",
    cost: 700000000,
    multiplier: 4,
    effects: ["All buildings"],
    desc: "With rolling papers, grinders, bongs, and snacks in hand, you're prepared for the ultimate session—and your buildings are thriving.",
    owned: false,
    showAt: () => buildings[0].amount >= 15,
    shown: false,
  },
];
