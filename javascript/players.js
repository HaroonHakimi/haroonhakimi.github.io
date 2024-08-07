const searchInput = document.querySelector(".search__input");
const dataWrap = document.querySelector(".data__wrapper");
const KEY = 3;

console.log("javascript loaded");

document.addEventListener('DOMContentLoaded', function () {
  const moonIcon = document.querySelector('.moon-icon');
  const sunIcon = document.querySelector('.sun-icon');
  const body = document.body;
  
  // Check if dark mode is already enabled
  if (body.classList.contains('dark-mode')) {
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
  } else {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  }

  moonIcon.addEventListener('click', function () {
    body.classList.add('dark-mode');
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
  });

  sunIcon.addEventListener('click', function () {
    body.classList.remove('dark-mode');
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  });
});


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

  console.log(players)

  if (players) {

    const html = players.map((player) => htmlSegment(player)).join("");
  
    dataWrap.innerHTML = html;
  }

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
  window.location.href = `/pages/player-detail.html?playerId=${playerId}`;
}

function renderPlayers(event) {
  event.preventDefault();
  getInput();
  searchInput.value = "";
}

