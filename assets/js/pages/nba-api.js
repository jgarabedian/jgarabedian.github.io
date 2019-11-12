results = {};
fetch("https://free-nba.p.rapidapi.com/players?page=0&per_page=25&search=carmelo", {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "free-nba.p.rapidapi.com",
        "x-rapidapi-key": "c695ef94afmshdb9b517dda66599p1bd14ejsn5e305c758e52"
    }
})
    .then(function(response) {
        response.json().then(function (data) {
            results = data;
            console.log(data.data[0])
        })
    })
    // .then(result => {
    //     console.log(result.data)
    // })
    .catch(err => {
        console.log(err);
    });