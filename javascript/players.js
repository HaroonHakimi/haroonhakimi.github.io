const searchInput = document.querySelector(".search__input");
const dataWrap = document.querySelector(".data__wrapper");
const KEY = 3;

console.log("javascript loaded");

function getInput() {
  const input = searchInput.value;
  getPlayerData(input);
  return input;
}

async function getPlayerData(input) {
  const playerData = await fetch(
    `https://www.thesportsdb.com/api/v1/json/${KEY}/searchplayers.php?p=${input}`
  );
  const data = await playerData.json();
  if (data.player[0].strCutout) {
    renderImage(data);
  } else {
    console.error('no image')
  }
  return data;
}

function renderImage(data) {
  const players = data.player;

  const html = players.map((player) => htmlSegment(player)).join("");

  dataWrap.innerHTML = html;
}

function htmlSegment(data) {
  return ` 
    <div class="data__image">  
    <img width="200" src=${data.strCutout} alt="" />
    <div class="overlay">
      <h3>${data.strPlayer}</h3>
      <button onclick="viewPlayerDetails('${data.idPlayer}')" class="button">Click to see more</button>
    </div>
  </div>
  `;
}

function viewPlayerDetails(playerId) {
  localStorage.setItem("playerId", playerId);
  window.location.href = "/pages/player-details.html";
}

function renderPlayers(event) {
  event.preventDefault();
  getInput();
  searchInput.value = "";
}
