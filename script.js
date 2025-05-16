console.log("Hello world!");

let gardenTotal = 0;
let bps = 0;

const gardenP = document.getElementById("garden-p");
gardenP.textContent = "Garden: " + gardenTotal; //show score as p tag

const bpsP = document.getElementById("bps-p");
bpsP.textContent = "BPS (blooms per second): " + bps;

const clickFlower = document.getElementById("click-flower");
clickFlower.addEventListener("click", function () {
  gardenTotal++;
  gardenP.textContent = "Garden: " + gardenTotal;
});

async function getMarketElements() {
  const response = await fetch(
    "https://cookie-upgrade-api.vercel.app/api/upgrades"
  );
  const data = await response.json();
  return data;
}

const marketContainer = document.getElementById("market-container");

const seedNames = [
  {
    id: 1,
    name: "Lavender",
  },
  {
    id: 2,
    name: "Sunflower",
  },
  {
    id: 3,
    name: "Pansy",
  },
  {
    id: 4,
    name: "Marigold",
  },
  {
    id: 5,
    name: "Peony",
  },
  {
    id: 6,
    name: "Bluebell",
  },
  {
    id: 7,
    name: "Lily",
  },
  {
    id: 8,
    name: "Tulip",
  },
  {
    id: 9,
    name: "Sprinkler",
  },
  {
    id: 10,
    name: "Greenhouse",
  },
];

async function createMarketstall() {
  const marketData = await getMarketElements();
  console.log(marketData); //to check data has been retrieved
  marketData.forEach((element, i) => {
    const nameTag = document.createElement("p");
    nameTag.textContent = seedNames[i].name; //dot notation needs to get name element from seednames object
    const costTag = document.createElement("p");
    costTag.textContent = "Costs: " + element.cost;
    const produceTag = document.createElement("p");
    produceTag.textContent = "Plants: " + element.increase + " bps";
    const harvestButton = document.createElement("button");
    harvestButton.className = "harvestButton";
    harvestButton.textContent = "Harvest for purchase";
    marketContainer.appendChild(nameTag);
    marketContainer.appendChild(costTag);
    marketContainer.appendChild(produceTag);
    marketContainer.appendChild(harvestButton); // button needs to subtract cost from gardentotal and introduce multiplier
    harvestButton.addEventListener("click", function () {
      if (gardenTotal >= element.cost) {
        gardenTotal = gardenTotal -= element.cost;
        console.log(gardenTotal);
        bps = bps += element.increase;
        gardenP.textContent = "Garden: " + gardenTotal;
        bpsP.textContent = "BPS (blooms per second): " + bps;
        const stringifiedGardenTotal = JSON.stringify(gardenTotal);
        localStorage.setItem("gardenTotal", stringifiedGardenTotal);
        localStorage.getItem(gardenTotal);
        JSON.parse(stringifiedGardenTotal);

        const stringifiedBPS = JSON.stringify(bps);
        localStorage.setItem("bps", stringifiedBPS);
        localStorage.getItem(bps);
        JSON.parse(stringifiedBPS);
      }
    });
  });
}

//blooms per second needs to display the total of the produce multipliers
createMarketstall();

setInterval(function () {
  gardenTotal += bps;
  gardenP.textContent = "Garden: " + gardenTotal;
  bpsP.textContent = "BPS (blooms per second): " + bps;
  const stringifiedGardenTotal = JSON.stringify(gardenTotal);
  localStorage.setItem("gardenTotal", stringifiedGardenTotal);
  localStorage.getItem(gardenTotal);
  JSON.parse(stringifiedGardenTotal);

  const stringifiedBPS = JSON.stringify(bps);
  localStorage.setItem("bps", stringifiedBPS);
  localStorage.getItem(bps);
  JSON.parse(stringifiedBPS);
}, 1000);

const saveButton = document.getElementById("save-button");
saveButton.addEventListener("click", function () {
  const stringifiedGardenTotal = JSON.stringify(gardenTotal);
  localStorage.setItem("gardenTotal", stringifiedGardenTotal);
  localStorage.getItem(gardenTotal);
  JSON.parse(stringifiedGardenTotal);

  const stringifiedBPS = JSON.stringify(bps);
  localStorage.setItem("bps", stringifiedBPS);
  localStorage.getItem(bps);
  JSON.parse(stringifiedBPS);
});

const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", function () {
  localStorage.clear();
  gardenTotal = 0;
  gardenP.textContent = "Garden: " + gardenTotal;
  bps = 0;
  bpsP.textContent = "BPS (blooms per second): " + bps;
});
