function results() {
    const searchField = document.getElementById('search-field');
    searchText = searchField.value;
    if (searchText == '') {
        alert("Search something");
    }
    else {
        const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${searchText}
        `;
        fetch(url)
            .then(res => res.json())
            .then(data => displayResults(data.teams));
    }
}
const resultsContainer = document.getElementById('results');
function displayResults(teams) {
    const errorMsg = document.getElementById('error-msg');
    const searchField = document.getElementById('search-field');
    searchField.value = '';
    resultsContainer.textContent = '';
    if (teams == null) {
        errorMsg.style.display = 'block';
    }
    else {
        errorMsg.style.display = 'none';
        teams.forEach(team => {
            const div = document.createElement('div');
            div.classList.add('result');
            div.innerHTML = `
            <div onclick="loadDetails('${team.idTeam}')" class="card">
            <img src="${team.strTeamBadge}" class="card-img-top w-50 mx-auto" alt="">
            <div class="card-body">
            <h5 class="card-title">${team.strTeam}</h5>
            <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
            </div>
        `
            resultsContainer.appendChild(div);
        })
    }
}

const loadDetails = async id => {
    try {
        const url = `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${id}`
        const res = await fetch(url);
        const data = await res.json();
        displayDetails(data.teams[0]);
    }
    catch(error){
         console.log(error);
        }   
}

function displayDetails(team){
    console.log(team);
    const detailsContainer = document.getElementById('details');
    detailsContainer.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `
            <div class="card w-50 mx-auto text-center">
            <img src="${team.strTeamBadge}" class="card-img-top w-50 mx-auto" alt="">
            <div class="card-body">
            <h5 class="card-title">${team.strTeam}</h5>
            <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
            </div>
    `
    detailsContainer.appendChild(div);
}
