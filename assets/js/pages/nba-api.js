// Global Variables
var leftSelect = false,
    leftPlayer = '',
    rightPlayer = '',
    rightSelect = false;
var selectedPlayers = {
    left: [],
    right: []
};
var chartData = {};
var statsCompared = {};

function getPlayers(results, container) {
    // if the search again, card is not selected
    // debugger;
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
        p.id = 'full-name';
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
                // debugger;
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
    for (i; i < length; i++) {
        if (cards[i].id != id) {
            cards[i].style.display = 'none';
        }
    }
    // remove elements above
    for (i = 0; i < length; i++) {
        if (cards[0].id != id) {
            cards[0].parentNode.removeChild(cards[0]);
        }
    }
    // After removing other cards, get the name and id
    if (container === 'card-container') {
        leftSelect = true;
        leftPlayer = id.replace('card', '');
        selectedPlayers.left[0] = div.querySelector('#full-name').innerText;
        selectedPlayers.left[1] = id;
    }
    if (container === 'card-container-right') {
        rightSelect = true;
        rightPlayer = id.replace('card', '');
        selectedPlayers.right[0] = div.querySelector('#full-name').innerText;
        selectedPlayers.right[1] = id;
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
                    // TODO: if data.data is empty, catch that
                    statsCompared = data.data;
                    showPlayerStats(statsCompared);
                    // debugger;
                    // paint(chartData);
                })
            })
    } else {
        console.log('You must select a player!');
    }
}

function showPlayerStats(players) {
    console.log(players);
    // clear chart Data
    chartData = {};
    if (players[0].player_id.toString() == leftPlayer) {
        createList(players, 0, 'stats-left', selectedPlayers["left"][0]);
        chartData[selectedPlayers["left"][0]] = players[0];
    } else {
        createList(players, 1, 'stats-left', selectedPlayers["left"][0]);
        chartData[selectedPlayers["left"][0]] = players[1];
    }
    if (players[1].player_id.toString() == rightPlayer) {
        createList(players, 1, 'stats-right', selectedPlayers["right"][0]);
        chartData[selectedPlayers["right"][0]] = players[1];
    } else {
        createList(players, 0, 'stats-right', selectedPlayers["right"][0]);
        chartData[selectedPlayers["right"][0]] = players[0];
    }
    data = getInitialStats(chartData);
    paint(data);
}

function createList(players, idx, ul, name) {
    destroyList(ul);
    var list = document.getElementById(ul);
    var header = document.getElementById(ul + '-name');
    header.innerHTML = name;
    // TODO: Is there a way I can create a loop for this?
    // Start with creating neccessary elements
    var ast = createElement('li'),
        gp = createElement('li'),
        pts = createElement('li'),
        mins = createElement('li'),
        reb = createElement('li'),
        fgPerc = createElement('li'),
        stl = createElement('li'),
        to = createElement('li'),
        threePerc = createElement('li'),
        blk = createElement('li');

    // Add values to our elements
    ast.innerHTML = 'Assists: ' + players[idx].ast;
    gp.innerHTML = 'Games Played: ' + players[idx].games_played;
    pts.innerHTML = 'Average Points: ' + players[idx].pts;
    mins.innerHTML = 'Minutes Per Game: ' + players[idx].min;
    reb.innerHTML = 'Rebounds Per Game: ' + players[idx].reb;
    fgPerc.innerHTML = 'Field Goal Percentage: ' + Math.round(players[idx].fg_pct * 1000) / 10 + '%';
    stl.innerHTML = 'Steals Per Game: ' + players[idx].stl;
    to.innerHTML = 'Turnovers Per Game: ' + players[idx].turnover;
    threePerc.innerHTML = '3 Point Percentage: ' + Math.round(players[idx].fg3_pct * 1000) / 10 + '%';
    blk.innerHTML = 'Blocks Per Game: ' + players[idx].blk;

    // Now append the created and filled elements
    appendElement(list, ast);
    appendElement(list, gp);
    appendElement(list, pts);
    appendElement(list, mins);
    appendElement(list, reb);
    appendElement(list, fgPerc);
    appendElement(list, stl);
    appendElement(list, to);
    appendElement(list, threePerc);
    appendElement(list, blk);
}

function checkButton() {
    btn = document.getElementById('compare-players');
    if (!leftSelect || !rightSelect) {
        btn.className = 'primary fit disabled';
    } else {
        btn.className = 'primary fit';
    }
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
    // nbaChart = echarts.init(document.getElementById('charts'));
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


