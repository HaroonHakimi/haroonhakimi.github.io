console.log("page loaded");

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const teamId = urlParams.get("teamId");
  console.log(teamId);
  console.log("Retrieved Team ID:", teamId);

  if (teamId) {
    fetchTeamDetails(teamId);
  } else {
    console.error("No team ID found");
  }
});

async function fetchTeamDetails(id) {
  try {
    const response = await fetch(
      `https://www.thesportsdb.com/api/v1/json/3/lookupteam.php?id=${id}`
    );
    const data = await response.json();

    if (data.teams && data.teams.length > 0) {
      console.log(data.teams)
      renderTeamDetails(data.teams[0]);
    } else {
      console.error("No team data found");
    }
  } catch (error) {
    console.error("Error fetching team details:", error);
  }
}

function renderTeamDetails(team) {
  const teamInfo = document.querySelector(".team");
  console.log(team.strTeam)

  if (teamInfo) {
    const html = `
      <div class="player">
    <div class="player__top--section">
      <img src="${team.strLogo}" alt="${team.strTeam}" width="300"/>
      </div>
      <div class="player__bottom--section"> 
      <p>Founded: ${team.intFormedYear}</p>
      <p>Stadium: ${team.strStadium}</p>
      </div>
      </div>
    `;

    teamInfo.innerHTML = html;
  }
}

function backToTeam() {
  window.location.href = `/pages/teams.html`;
}
