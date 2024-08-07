console.log('page loaded')

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const teamId = urlParams.get("teamId");
  console.log(teamId)
  console.log("Retrieved Player ID:", teamId);
  
    if (teamId) {
      fetchTeamDetails(teamId);
    } else {
      console.error("No team ID found");
    }
  });
  
  async function fetchTeamDetails(teamId) {
    try {
      const response = await fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupteam.php?id=${teamId}`);
      const data = await response.json();
  
      if (data.teams && data.teams.length > 0) {
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

    if (teamInfo) {
    const html = `
      <h2>${team.strTeam}</h2>
      <img src="${team.strLogo}" alt="${team.strTeam}" width="300"/>
      <p>Founded: ${team.intFormedYear}</p>
      <p>Stadium: ${team.strStadium}</p>
    `;
  
    teamInfo.innerHTML = html;
    }

  }

function backToTeam() {
  window.location.href = `/pages/teams.html`
}
  