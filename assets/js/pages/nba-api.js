results = {};

// where do I want to return the results to?
function getPlayers(results) {
    return results.map(function (player) {
        // const ul = document.getElementById('results');
        // let li = createElement('li');
        // let playerCard = `${player.first_name}` + ' ' + `${player.last_name}`;
        // playerCard += '<br>Team: ' + `${player.team.full_name}`;
        // playerCard += '<br>id: ' + `${player.id}`;
        // li.innerHTML = playerCard;
        // appendElement(ul, li)
        // Use the logic to create cards
        const cardContainer = document.getElementById('card-container');
        cardContainer.innerHTML += playerCard;
        let id = `${player.id}`;
        let teamName = document.getElementById('team-name');
        let playerName = document.getElementById('player-name');
        let playerStats = document.getElementById('player-stats');
        let h5 = createElement('h5');
        let team = `${player.team.full_name}`;
        let p = createElement('p');
        // create unique IDs for the player card
        // TODO: add this to entire card for further interaction
        changeId(playerName, 'player-name' + id);
        changeId(playerStats, 'player-stats' + id);
        changeId(teamName, 'team-name' + id);
        
        // Add team name
        appendElement(teamName, h5);
        h5.innerHTML = team;
        
        // Add player name
        appendElement(playerName, p);
        p.innerHTML = `${player.first_name}` + ' ' + `${player.last_name}`;
        // Add player height
        p = createElement('p');
        appendElement(playerStats, p);
        if (`${player.height_feet}` === "null") {
            p.innerHTML = 'Height is not available'
        } else {
            p.innerHTML = 'Height: ' + `${player.height_feet}` + '\'' + `${player.height_inches}` + '"';
        }
        // Add player position
        p = createElement('p');
        appendElement(playerStats, p);
        p.innerHTML = 'Position: ' + `${player.position}`;
    })
}

function addClass(el, className) {
    el.className = className;
    return el;
}

function changeId(el, id) {
    el.id = id;
    return el;
}

function createElement(el) {
    return document.createElement(el)
}

function appendElement(parent, el) {
    return parent.appendChild(el);
}

function destroyList() {
    document.getElementById('card-container').innerHTML = '';
    // console.log('destroy past results')
}

function searchPlayer(search) {
    destroyList();
    var url = 'https://free-nba.p.rapidapi.com/players?page=0&per_page=50&search=';
    url += encodeURI(search);
    fetch(url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "free-nba.p.rapidapi.com",
            "x-rapidapi-key": "c695ef94afmshdb9b517dda66599p1bd14ejsn5e305c758e52"
        }
    })
        .then(function (response) {
            response.json().then(function (data) {
                // results = data.data;
                console.log(data.data);
                getPlayers(data.data);
            }).catch(err => {
                console.log(err);
            });
        })
        .catch(err => {
            console.log(err);
        });
}

// get event listeners only when page loads
window.onload = function () {
    getEventListeners();
}

function getEventListeners() {
    document.getElementById('playerSearchBtn').addEventListener('click', function () {
        var searchStr = document.getElementById('player-search-field').value;
        searchPlayer(searchStr);
    });
    document.getElementById('player-search-field').addEventListener('keypress', function (e) {
        if (e.which === 13) {
            var searchStr = document.getElementById('player-search-field').value;
            searchPlayer(searchStr);
        }
    })
}

var playerCard = '';
playerCard += '<div class="player__card" id="card">';
playerCard += '<div class="player__card__header">';
playerCard += '<div class="player__card-team" id="team-name">';
playerCard += '</div>';
playerCard += '<div class="player__card-name" id="player-name">';
playerCard += '</div></div>';
playerCard += '<div class="player__card__content">';
playerCard += '<div class="player__card__content__left">';
playerCard += '<i class="fas fa-user fa-5x"></i>';
playerCard += '</div><div class="player__card__content__right" id="player-stats">';
playerCard += '</div></div></div>';


