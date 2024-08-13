const searchInput = document.querySelector(".search__input");
const dataWrap = document.querySelector(".data__wrapper");
const errorDiv = document.createElement("div");
const KEY = 3;

console.log("javascript loaded");

function getInput() {
  const input = searchInput.value;
  getTeamData(input);
  console.log("getting input");
  return input;
}

function noImage() {
  errorDiv.classList.add("data__error");
  errorDiv.innerHTML = `
    <div class="error__title">Try Again <span class="red">Sorry!</span></div>
    <img width="300" src="/images/error-image.svg" alt="">
  `;
  dataWrap.appendChild(errorDiv);
}

async function getTeamData(input) {
  const teamData = await fetch(
    `https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${input}`
  );
  const data = await teamData.json();

  if (data?.teams[0]?.strLogo) {
    data.teams = data.teams.slice(0, 1);
    renderImage(data);
  } else {
    noImage();
  }
  return data;
}

function renderImage(data) {
  const teams = data.teams;

  if (teams) {
    const html = teams.map((team) => htmlSegment(team)).join("");

    dataWrap.innerHTML = html;
  }
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

function viewTeamDetails(teamId) {
  window.location.href = `/pages/team-detail.html?teamId=${teamId}`;
}

function renderTeams(event) {
  event.preventDefault();
  getInput();
  searchInput.value = "";
  errorDiv.classList.remove("data__error");
  dataWrap.classList.remove('data__image')
}
