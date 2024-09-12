
# Weed Clicker

![Weed Clicker Logo](./assets/img/logo.svg)

Weed Clicker is a fun and addictive browser-based clicker game where you accumulate **buds of weed** by clicking and purchasing buildings that increase your production. The game is built entirely in **Vanilla JavaScript** and features various buildings, upgrades, and achievements.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Gameplay](#gameplay)
- [Buildings](#buildings)
- [Upgrades](#upgrades)
- [Changelog](#changelog)
- [How to Run](#how-to-run)
- [License](#license)
  
## Overview

In Weed Clicker, your goal is to become the biggest weed mogul by collecting buds of weed and using them to unlock new buildings and upgrades. You can also gain **buds per second (BPS)**, which increases automatically as you buy more buildings.

## Features

- **Incremental Gameplay**: Start by clicking to collect weed buds, and gradually unlock new buildings that automate the process.
- **Buildings and Upgrades**: Purchase and manage over 20 unique buildings and upgrades that boost your bud production.
- **Save and Load**: Your progress is automatically saved every 30 seconds via `localStorage`.
- **Dynamic Shop**: Buy and sell buildings and upgrades to manage your empire efficiently.

## Gameplay

To get started, click on the large **weed leaf** image to collect your first few buds. Once you have enough, you can use them to buy buildings that generate buds passively. As you accumulate more buds, new buildings and upgrades become available in the shop.

### Interface:

- **Buds Counter**: Displays the number of buds you currently have.
- **Buds per Second (BPS)**: Displays your current production rate of buds per second.
- **Shop**: The shop is divided into two sections, one for **buildings** and one for **upgrades**.
  
![Clicker Image](./assets/img/click_img.png)

## Buildings

Buildings automatically generate buds over time. Here's a list of the available buildings:

| Building                 | Cost      | Buds per Second (BPS) |
|--------------------------|-----------|-----------------------|
| Weed Plant                | 10        | 0.5                   |
| Underground Garage        | 50        | 1.5                   |
| Weed Farm                 | 100       | 5.0                   |
| Weed Factory              | 1,000     | 15.0                  |
| Weed Lab                  | 5,000     | 30.0                  |
| Stoner's Den              | 10,000    | 100.0                 |
| Hydroponic Bunker         | 20,000    | 120.0                 |
| Munchies Factory          | 50,000    | 150.0                 |
| Cannabis Cathedral        | 100,000   | 250.0                 |
| Budzooka Dispensary       | 250,000   | 300.0                 |
| Narco Routes              | 500,000   | 400.0                 |
| Back Alley Weed Deal      | 600,000   | 500.0                 |
| Weed Convention Center    | 1,000,000 | 750.0                 |
| Cannabis Greenhouse       | 2,000,000 | 1,000.0               |
| Amsterdam Coffee Shop     | 5,000,000 | 1,200.0               |
| Medical Marijuana Clinic  | 10,000,000| 1,500.0               |
| CBD Research Lab          | 20,000,000| 1,800.0               |
| Underground Cannabis Empire | 50,000,000| 2,500.0              |

(For a full list of buildings, see the [buildings.js file](./buildings.js))

## Upgrades

Upgrades boost the efficiency of your buildings or provide general bonuses to bud production.

| Upgrade                  | Cost      | Effect                 |
|--------------------------|-----------|------------------------|
| Better Seeds              | 1,000     | 2x Weed Plant BPS      |
| Weed Fertilizer           | 2,000     | 1.25x Weed Farm BPS    |
| PH-Neutral Water          | 3,500     | 1.15x Weed Factory BPS |
| Cocaine for the Workers   | 100,000   | 2x BPS                 |
| Grow Lights               | 20,000    | 2.5x Weed Plant BPS    |
| Nutrient Solution         | 30,000    | 1.13x Hydroponic Bunker BPS |
| Felix's Special Bowl      | 150,000   | 2x Stoner's Den BPS    |
| Guerilla Support          | 500,000   | 1.15x Narco Routes BPS |

(For a full list of upgrades, see the [upgrades.js file](./upgrades.js))

## Changelog

### Version 0.1.3
- added 8 more tracks
   - music controls for track management

### Version 0.1.2
- Added Background Music
   - Music Controls
- Link targeting fixed

### Version 0.1.1
- 2 Factor Reset Check
- Added multiple buy solution

### Version 0.1.0
- Stats
- Click Animations
- 7 New Upgrades for Clickmultiplier

### Version 0.0.6
- added Stats
   - tracking and displaying various stats

### Version 0.0.5
- favicon + Tab Bud indicator
- background animation and minor cosmetic fixes

### Version 0.0.4
- Fixed bud incrementation when tab is inactive
- added better readability through decimal points
- minor bugfixes

### Version 0.0.3
- Fixed footer placement for mobile
- Added new buildings and upgrades
- Optimized game performance and UI
- Implemented local storage for saving game state
- Frontend facelift and cosmetic improvements

### Version 0.0.2
- Added Felix's Special Bowl upgrade
- Added price and production patches
- Bug fixes for hover states and shop buttons

### Version 0.0.1
- Initial release with basic clicker functionality and building system

## How to Run

To play Weed Clicker, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://www.github.com/yousifpa98/clicker
   ```

2. **Open in Browser**:
   Navigate to the folder and open `index.html` in your preferred browser.

3. **Play**:
   Start clicking to accumulate buds and build your weed empire!

#### OR

Visit https://yousifpa98.github.io/clicker/

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Credits

All images used in the game, including **buildings** and **upgrades**, are AI-generated.

---