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

// const seedNames = [
//   "Lavender",
//   "Sunflower",
//   "Pansy",
//   "Marigold",
//   "Peony",
//   "Bluebell",
//   "Lily",
//   "Tulip",
//   "Sprinkler",
//   "Greenhouse",
// ];

async function createMarketstall() {
  const marketData = await getMarketElements();
  console.log(marketData);
  marketData.forEach((element) => {
    const nameTag = document.createElement("p");
    nameTag.textContent = element.name;
    const costTag = document.createElement("p");
    costTag.textContent = element.cost;
    const produceTag = document.createElement("p");
    produceTag.textContent = element.increase;
    const harvestButton = document.createElement("button");
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
        bpsP.textContent = "BPS: " + bps;
      }
    });
  });
}

//blooms per second needs to display the total of the produce multipliers
createMarketstall();

setInterval(function () {
  gardenTotal += bps;
  gardenP.textContent = "Garden: " + gardenTotal;
  bpsP.textContent = "BPS: " + bps;
}, 1000);
