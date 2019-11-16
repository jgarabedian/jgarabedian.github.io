results = {};

// where do I want to return the results to?
function getPlayers(results) {
    return results.map(function (player) {
        const ul = document.getElementById('results');
        let li = createElement('li');
        let playerCard = `${player.first_name}` + ' ' + `${player.last_name}`;
        playerCard += '<br>Team: ' + `${player.team.full_name}`;
        li.innerHTML = playerCard;
        appendElement(ul, li)
    })
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
                // console.log(data.data);
                getPlayers(data.data);
            }).catch(err => {
                console.log(err);
            });
        })
        // .then(result => {
        //     console.log(result.data)
        // })
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
    })
}