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

function paint(data) {
    var option = {
        title: {
            show: false,
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
            }
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
                }
            }
        ],
        yAxis: [
            {
                type: 'category',
                show: true,
                name: 'Category',
                axisLabel: {
                    show: true,
                    color: 'white'
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
                        position: 'inside'
                    }
                },
                data: getStats(data, 0)
            },
            {
                name: getPlayerNames(data)[1],
                type: 'bar',
                label: {
                    normal: {
                        show: true
                    }
                },
                data: getStats(data, 1)
            }
        ],
        colors: ['#546570', '#c4ccd3']
    };

    nbaChart.setOption(option);
}
