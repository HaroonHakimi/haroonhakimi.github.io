const searchInput = document.querySelector(".search__input");
const dataWrap = document.querySelector(".data__wrapper");
const KEY = 3;

console.log("javascript loaded");

function getInput() {
  const input = searchInput.value;
  getTeamData(input);
  return input;
}

async function getTeamData(input) {
  const teamData = await fetch(
    `https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${input}`
  );
  const data = await teamData.json();
  console.log(data);
  if (data.teams[0].strLogo) {
    renderImage(data);
  } else {
    console.error("no image");
  }
  return data;
}

function renderImage(data) {
  const teams = data.teams;

  const html = teams.map((team) => htmlSegment(team)).join("");

  dataWrap.innerHTML = html;
}

function htmlSegment(data) {
  return ` 
    <div class="data__image">  
    <img width="200" src=${data.strLogo} alt="" />
    <div class="overlay">
      <h3>${data.strTeam}</h3>
      <button onclick="viewTeamDetails('${data.idTeam}')" class="button">Click to see more</button>
    </div>
  </div>
  `;
}

function viewPlayerDetails(teamId) {
  localStorage.setItem("teamId", teamId);
  window.location.href = "/pages/team-details.html";
}

function renderTeams(event) {
  event.preventDefault();
  getInput();
  searchInput.value = "";
}
