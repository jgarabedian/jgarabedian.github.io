// Global Variables
var leftSelect = false,
    leftPlayer = '',
    rightPlayer = '',
    rightSelect = false;
var selectedPlayers = {};
fetch("https://free-nba.p.rapidapi.com/games?Seasons=2019&page=0&per_page=25", {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "free-nba.p.rapidapi.com",
        "x-rapidapi-key": "46332bc018mshbf0ce3c150e74cap113a99jsn4e1df656eb26"
    }
})
    .then(response => {
        console.log(response.data)
    })
    .catch(err => {
        console.log(err);
    });

function getPlayers(results, container) {
    // if the search again, card is not selected
    if (container === 'card-container') {
        leftSelect = false;
        leftPlayer = '';
    }
    if (container === 'card-container-right') {
        rightSelect = false;
        rightSelect = '';
    }
    checkButton();
    return results.map(function (player) {
        const cardContainer = document.getElementById(container);
        cardContainer.innerHTML += playerCard;
        let id = `${player.id}`,
            card = document.getElementById('card'),
            teamName = document.getElementById('team-name'),
            playerName = document.getElementById('player-name'),
            playerStats = document.getElementById('player-stats'),
            teamLogo = document.getElementById('team-logo'),
            h5 = createElement('h5'),
            team = `${player.team.full_name}`,
            logoDir = '/images/logos/',
            p = createElement('p');
        // create unique IDs for the player card
        changeId(card, 'card' + id);
        changeId(playerName, 'player-name-' + id);
        changeId(playerStats, 'player-stats-' + id);
        changeId(teamName, 'team-name-' + id);
        changeId(teamLogo, 'team-logo-' + team);
        teamLogo.src = logoDir + team + '.png'
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
    });
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

function destroyList(container) {
    document.getElementById(container).innerHTML = '';
    // console.log('destroy past results')
}

function searchPlayer(search, container) {
    destroyList(container);
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
                // console.log(data.data);
                getPlayers(data.data, container);
                addCardClick();
            }).catch(err => {
                console.log(err);
            });
        })
        .catch(err => {
            console.log(err);
        });
}

function addCardClick() {
    let cards = document.getElementsByClassName('player__card'),
        i = 0;
    var length = cards.length;
    for (i; i < length; i++) {
        cards[i].addEventListener('click', function () {
            cardFocus(this.parentElement.id, this.id);
        });
    }
}

function cardFocus(container, id) {
    let div = document.getElementById(container),
        cards = div.getElementsByClassName('player__card'),
        i = 0,
        length = cards.length;
    if (container === 'card-container') {
        leftSelect = true;
        leftPlayer = id.replace('card', '');
    }
    if (container === 'card-container-right') {
        rightSelect = true;
        rightPlayer = id.replace('card', '');
    }
    for (i; i < length; i++) {
        if (cards[i].id !== id) {
            cards[i].style.display = 'none';
        }
    }
    checkButton();
}

function getPlayerStats() {
    if (leftSelect && rightSelect) {
        let players = 'player_ids[]=' + leftPlayer + '&player_ids[]=' + rightPlayer;
        let url = 'https://www.balldontlie.io/api/v1/season_averages?season=2019&';
        url += players;
        fetch(url, {
            'method': 'GET'
        })
            .then(function (response) {
                response.json().then(function (data) {
                    console.log(data.data);
                    selectedPlayers = data.data;
                })
            })
    } else {
        console.log('You must select a player!');
    }
}

function checkButton() {
    btn = document.getElementById('compare-players');
    if (!leftSelect || !rightSelect) {
        btn.className = 'primary fit disabled';
    } else {
        btn.className = 'primary fit';
    }
}

// get event listeners only when page loads
window.onload = function () {
    getEventListeners();
    this.checkButton();
}

function getEventListeners() {
    document.getElementById('playerSearchBtn').addEventListener('click', function () {
        var searchStr = document.getElementById('player-search-field').value;
        searchPlayer(searchStr, 'card-container');
    });
    document.getElementById('player-search-field').addEventListener('keypress', function (e) {
        if (e.which === 13) {
            var searchStr = document.getElementById('player-search-field').value;
            searchPlayer(searchStr, 'card-container');
        }
    });
    document.getElementById('playerSearchBtn-2').addEventListener('click', function () {
        var searchStr = document.getElementById('player-search-field-2').value;
        searchPlayer(searchStr, 'card-container-right');
    });
    document.getElementById('player-search-field-2').addEventListener('keypress', function (e) {
        if (e.which === 13) {
            var searchStr = document.getElementById('player-search-field-2').value;
            searchPlayer(searchStr, 'card-container-right');
        }
    });
    document.getElementById('compare-players').addEventListener('click', getPlayerStats);
    // document.addEventListener('click', checkButton);
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
playerCard += '<img class="team-logo" id="team-logo"></i>';
playerCard += '</div><div class="player__card__content__right" id="player-stats">';
playerCard += '</div></div></div>';


