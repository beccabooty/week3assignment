console.log("Hello world!");


  let gardenTotal= 0;
  let bps= 0;

document.getElementById("garden-p");
garden-p.textContent = gardenTotal

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
    marketContainer.appendChild(harvestButton);
    harvestButton.addEventListener("click",function(){
      if gardenTotal 
    })
  });
}

createMarketstall();


setInterval(function () {
  gardenTotal += bps;
}, 1000);
