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
        let card = createElement('div');
        addClass(card, 'player__card')
        appendElement(cardContainer, card)
        let cardHeader = createElement('div');
        addClass(cardHeader, 'player__card__header')
        appendElement(card, cardHeader);
        let cardTeam = createElement('div');
        addClass(cardTeam, 'player__card-team');
        appendElement(cardHeader, cardTeam);
        let h5 = createElement('h5');
        appendElement(cardTeam, h5);
        let team = `${player.team.full_name}`;
        h5.innerHTML = team;
        
    })
}

function addClass(el, className) {
    el.className = className;
    return el;
}

function createCard(el, player) {
    el.className = 'player__card';
    el.id = 'player__card-' + String(`${player.id}`);
    return el
}

function createElement(el) {
    return document.createElement(el)
}

function appendElement(parent, el) {
    return parent.appendChild(el);
}

function destroyList() {
    document.getElementById('results').innerHTML = '';
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