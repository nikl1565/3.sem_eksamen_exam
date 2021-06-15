export async function getTapData(jsonData) {
  let url = "https://hold-kaeft-vi-har-det-godt.herokuapp.com/";
  let tapData = await fetch(url);
  tapData = await tapData.json();

  checkTapStatus(tapData["taps"], jsonData);
}

export const available = {
  "Ruined Childhood": false,
  "El Hefe": false,
  GitHop: false,
  "Row 26": false,
  "Hollaback Lager": false,
  "Hoppily Ever After": false,
  Sleighride: false,
  Mowintime: false,
  Steampunk: false,
  "Fairy Tale Ale": false,
};

function checkTapStatus(taps, jsonData) {
  taps.forEach((beerTap) => {
    for (let i = 0; i < jsonData.length; i++) {
      const beername = jsonData[i].name;

      if (beerTap.beer === beername) {
        available[beername] = true;
      }
    }
  });

  setTimeout(() => {
    checkTapStatus(taps, jsonData);
  }, 10000);
}
