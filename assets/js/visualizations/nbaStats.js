// The container we're going to put it in
var nbaChart = echarts.init(document.getElementById('charts'));

// var data = {
//     'categories': ['ast', 'blk'],
//     'players': ['Jrue Holiday', 'Mike Conley'],
//     'playerStats': {
//         'Jrue Holiday': {
//             'ast': 3,
//             'blk': 4,
//             'stl': 3
//         },
//         'Mike Conley': {
//             'ast': 2,
//             'blk': 6,
//             'stl': 3
//         }
//     }
// }

var colors = ['#5BC0EB', '#9BC53D'];

function getColors(colors) {
    return colors;
}

function getCategories(data) {
    // Just select the first player to get the keys
    var categories = Object.keys(data[getPlayerNames(data)[0]]);
    var cat = [],
        i = 0;
    for (i; i < categories.length; i++) {
        cat.push(categories[i]);
    }
    return cat;
}

function getPlayerNames(data) {
    var players = Object.keys(data);
    var play = [],
        i = 0;
    for (i; i < players.length; i++) {
        play.push(players[i]);
    }
    return play;
}

function getStats(data, playerIdx) {
    var stats = Object.values(data[getPlayerNames(data)[playerIdx]]);
    var statData = [],
        i = 0;
    // debugger
    for (i; i < stats.length; i++) {
        statData.push(stats[i]);
    }
    return statData;
}

// data I actually want to show
var stats = ['ast', 'blk', 'dreb', 'fg3m', 'fgm', 'fga', 'fta', 'ftm', 'oreb', 'pf', 'pts', 'reb', 'stl', 'turnover'];

function getInitialStats(data) {
    var i = 0,
        j = 0,
        keysStats = Object.keys(data[getPlayerNames(data)[0]]),
        deleteIdx = [],
        player1Name = getPlayerNames(data)[0],
        player2Name = getPlayerNames(data)[1];
    var player1Stats = data[player1Name],
        player2Stats = data[player2Name];
    
    // We need to do this loops while we go through each player and write it back
    // This remove the key value pairs not in our array
    for (i; i < keysStats.length; i++) {
        if (!(stats.indexOf(keysStats[i]) > -1)) {
            deleteIdx.push(keysStats[i]);
            // delete data[player1Name][keysStats[i]];
            // delete data[player2Name][keysStats[i]];
        }
    }
    for (j; j < deleteIdx.length; j++) {
        delete player1Stats[deleteIdx[j]];
        delete player2Stats[deleteIdx[j]];
    }
    return data
}

function paint(data) {
    var option = {
        color: ['#5BC0EB', '#9BC53D'],
        title: {
            show: true,
            text: 'Player Comparison',
            textStyle: {
                color: 'white',
                fontStyle: 'italic'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'line'
            }
        },
        legend: {
            data: getPlayerNames(data),
            textStyle: {
                color: 'white'
            },
            right: 0,
            itemGap: 15
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'value',
                show: true,
                nameTextStyle: {
                    color: 'white'
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: 'white'
                    }
                }
            }
        ],
        yAxis: [
            {
                type: 'category',
                show: true,
                axisLabel: {
                    show: true,
                    color: 'white'
                },
                axisLine: {
                    show: true,
                    width: 3,
                    lineStyle: {
                        color: 'white'
                    }
                },
                axisTick: { show: true },
                data: getCategories(data)
            }
        ],
        series: [
            {
                name: getPlayerNames(data)[0],
                type: 'bar',
                label: {
                    normal: {
                        show: true,
                        position: 'right'
                    }
                },
                data: getStats(data, 0)
            },
            {
                name: getPlayerNames(data)[1],
                type: 'bar',
                label: {
                    normal: {
                        show: true,
                        position: 'right'
                    }
                },
                data: getStats(data, 1)
            }
        ]
    };

    nbaChart.setOption(option);
}
