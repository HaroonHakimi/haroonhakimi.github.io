console.log("page loaded");

document.addEventListener("DOMContentLoaded", () => {
  // Parse URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const playerId = urlParams.get("playerId");
  console.log("Retrieved Player ID:", playerId);

  if (playerId) {
    fetchPlayerDetails(playerId);
  } else {
    console.error("No player ID found");
  }
});

async function fetchPlayerDetails(playerId) {
  try {
    const response = await fetch(
      `https://www.thesportsdb.com//api/v1/json/3/lookupplayer.php?id=${playerId}`
    );
    const data = await response.json();

    if (data.players && data.players.length > 0) {
      renderPlayerDetails(data.players[0]);
    } else {
      console.error("No player data found");
    }
  } catch (error) {
    console.error("Error fetching player details:", error);
  }
}

function renderPlayerDetails(player) {
  const playerInfo = document.querySelector(".player-info");

  if (playerInfo) {
    const html = `
    <div class="player">
    <div class="player__top--section">
    <img src="${player.strCutout}" alt="${player.strCutout}" width="300"/>
    </div>
    <div class="player__bottom--section">
      <h2>${player.strPlayer}</h2>
      <p>Nationality: ${player.strNationality}</p>
      <p>Team: ${player.strTeam}</p>
      <p>Active: ${player.strStatus}</p>
      </div>
      </div>
    `;

    playerInfo.innerHTML = html;
  }
}

function backToPlayer() {
  window.location.href = `/players.html`;
}
