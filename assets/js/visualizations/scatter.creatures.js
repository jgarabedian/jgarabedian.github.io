

function paint() {
    // set the dimensions and margins of the graph
    d3.select("svg").remove();
    var chart = d3.select('#scatter');
    var margin = { top: 10, right: 50, bottom: 60, left: 60 },
        width = chart.node().getBoundingClientRect().width - margin.left - margin.right,
        height = chart.node().getBoundingClientRect().height - margin.top - margin.bottom;

    var svg = d3.select("#scatter")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    d3.csv('../../assets/data/creatures.csv', function (error, data) {
        // var data = data;
        // Add X axis
        var xMax = d3.max(data, function (d) { return d.Longevity + 1; });
        var x = d3.scaleLinear()
            .domain([0, xMax])
            .range([0, width]);

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        svg.append("text")
            .attr("transform",
                "translate(" + (width / 2) + " ," +
                (height + margin.top + 30) + ")")
            .style("text-anchor", "middle")
            .text("Longevity");

        // Add Y axis
        // var yMax = d3.max(data, function (d) { return d.RestingHeartRate + 1; });
        // console.log(d3.max(d.RestingHeartRate));
        // var yMax = 500;
        var y = d3.scaleLinear()
            .domain([0, 500])
            .range([height, 0]);

        svg.append("g")
            .call(d3.axisLeft(y));

        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Heart Rate (BPM)");


        // add size radius
        var r = d3.scaleLinear().range([10, 20]);

        // add tooltip events

        var tooltip = d3.select("#scatter").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        var tipMouseover = function (d) {
            // var color = colorScale(d.manufacturer);
            color = '#8DACC6';
            color2 = 'black';
            var html = "<span class='tooltip-dimensions' style='color:" + color + ";'>" + d.Creature + "</span><br>" +
                "<span style='color:" + color2 + ";'>" + d.Mass + " Grams, " + d.RestingHeartRate +
                " bpm, " + d.Longevity + " Years</span>";

            tooltip.html(html)
                .style("left", (d3.event.pageX + 15) + "px")
                .style("top", (d3.event.pageY - 28) + "px")
                .transition()
                .duration(200) // ms
                .style("opacity", .9) // started as 0!
        };

        // tooltip mouseout event handler
        var tipMouseout = function (d) {
            tooltip.transition()
                .duration(300) // ms
                .style("opacity", 0); // don't care about position!
        };

        // Add dots
        svg.append('g')
            .selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function (d) { return x(d.Longevity); })
            .attr("cy", function (d) { return y(d.RestingHeartRate); })
            .attr("r", 5)
            .style("fill", "#8DACC6")
            .on("mouseover", tipMouseover)
            .on("mouseout", tipMouseout);

    });

}

window.addEventListener('resize', paint);

paint();




