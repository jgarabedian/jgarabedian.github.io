"use strict";

// This will be the default color
var color1 = 'rgba(141, 172, 198, 1)',
    backgroundColor = 'rgba(218, 209, 210, 1)',
    textColor = 'black';
var pickr = null;
var el = document.createElement('p');
var theme = 'classic';
pickrContainer = document.querySelector('.color-pickr-scatter');
pickrContainer.appendChild(el); // Simple example, see optional options for more configuration.

config = {
  swatches: ['rgba(244, 67, 54, 1)', 'rgba(233, 30, 99, 0.95)', 'rgba(156, 39, 176, 0.9)', 'rgba(103, 58, 183, 0.85)', 'rgba(63, 81, 181, 0.8)', 'rgba(33, 150, 243, 0.75)', 'rgba(3, 169, 244, 0.7)', 'rgba(0, 188, 212, 0.7)', 'rgba(0, 150, 136, 0.75)', 'rgba(76, 175, 80, 0.8)', 'rgba(139, 195, 74, 0.85)', 'rgba(205, 220, 57, 0.9)', 'rgba(255, 235, 59, 0.95)', 'rgba(255, 193, 7, 1)'],
  components: {
    preview: true,
    opacity: true,
    hue: true,
    interaction: {
      hex: true,
      rgba: true,
      hsva: true,
      input: true,
      clear: true,
      save: true
    }
  },
  closeWithKey: 'Escape'
}; // Create fresh instance

pickr = new Pickr(Object.assign({
  el: el,
  theme: theme,
  "default": color1
}, config));
pickrContainer2 = document.querySelector('.color-pickr-background');
pickrContainer2.appendChild(el);
var pickr2 = null;
pickr2 = new Pickr(Object.assign({
  el: el,
  theme: theme,
  "default": backgroundColor
}, config));
pickrTextContainer = document.querySelector('.text-pickr');
pickrTextContainer.appendChild(el);
var pickrText = new Pickr(Object.assign({
  el: el,
  theme: theme,
  "default": 'black'
}, config));
pickr.on('save', function (color, instance) {
  console.log('save', color, instance);
  console.log(instance._color.toRGBA().toString());
  color1 = instance._color.toRGBA().toString();
  pickr.hide();
  paint();
});
pickr2.on('save', function (color, instance) {
  console.log(instance._color.toRGBA().toString());
  backgroundColor = instance._color.toRGBA().toString();
  pickr2.hide();
  paint();
});
pickrText.on('save', function (color, instance) {
  console.log(instance._color.toRGBA().toString());
  textColor = instance._color.toRGBA().toString();
  pickrText.hide();
  paint();
});

function paint() {
  // set the dimensions and margins of the graph
  d3.select("svg").remove();
  var chart = d3.select('#scatter');
  var margin = {
    top: 10,
    right: 50,
    bottom: 50,
    left: 60
  },
      width = chart.node().getBoundingClientRect().width - margin.left - margin.right,
      height = chart.node().getBoundingClientRect().height - margin.top - margin.bottom;
  var svg = d3.select("#scatter").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).attr("id", 'scatter-svg') // .style("background-color", backgroundColor)
  .append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  d3.csv('../../assets/data/creatures.csv', function (error, data) {
    // var data = data;
    // Add X axis
    var xMax = d3.max(data, function (d) {
      return d.Longevity + 1;
    });
    var x = d3.scaleLinear().domain([0, 0]).range([0, width]);
    svg.append("text").attr("transform", "translate(" + width / 2 + " ," + (height + margin.top + 30) + ")").style("text-anchor", "middle").text("Longevity"); // Add Y axis
    // var yMax = d3.max(data, function (d) { return d.RestingHeartRate + 1; });
    // console.log(d3.max(d.RestingHeartRate));
    // var yMax = 500;

    var y = d3.scaleLinear().domain([0, 500]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));
    svg.append("text").attr("transform", "rotate(-90)").attr("y", 0 - margin.left).attr("x", 0 - height / 2).attr("dy", "1em").style("text-anchor", "middle").text("Heart Rate (BPM)"); // add size radius

    var r = d3.scaleLinear().range([10, 20]); // add tooltip events

    var tooltip = d3.select("#scatter").append("div").attr("class", "tooltip").attr("id", 'scatter-tooltip').style("opacity", 0);

    var tipMouseover = function tipMouseover(d) {
      // var color = colorScale(d.manufacturer);
      // color2 = 'black';
      var html = "<span class='tooltip-dimensions' style='color:" + color1 + ";'>" + "<b style='color:" + color1 + ";'>" + d.Creature + "</b></span><br>" + "<span style='color:" + textColor + ";'><b style='color:" + textColor + ";'>" + d.Mass + "</b> Grams, <b style='color:" + textColor + ";'>" + d.RestingHeartRate + "</b> bpm, <b style='color:" + textColor + ";'>" + d.Longevity + "</b> Years</span>";
      tooltip.html(html).style("left", d3.event.pageX + 15 + "px").style("top", d3.event.pageY - 28 + "px").transition().duration(200) // ms
      .style("opacity", .9); // started as 0!
    }; // tooltip mouseout event handler


    var tipMouseout = function tipMouseout(d) {
      tooltip.transition().duration(300) // ms
      .style("opacity", 0); // don't care about position!
    }; // Add dots


    svg.append('g').selectAll("dot").data(data).enter().append("circle").attr("cx", function (d) {
      return x(d.Longevity);
    }).attr("cy", function (d) {
      return y(d.RestingHeartRate);
    }).attr("r", 5).style("fill", color1).on("mouseover", tipMouseover).on("mouseout", tipMouseout); // new X axis

    x.domain([0, xMax]);
    svg.select(".myXaxis").transition().duration(2000).attr("opacity", "1").call(d3.axisBottom(x));
    svg.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x)); // animation

    svg.selectAll("circle").transition().delay(function (d, i) {
      return i * 3;
    }).duration(2000).attr("cx", function (d) {
      return x(d.Longevity);
    }).attr("cy", function (d) {
      return y(d.RestingHeartRate);
    }); // Add background color and include tooltip

    document.getElementById('scatter').style.backgroundColor = backgroundColor;
    var all = document.getElementsByClassName('tooltip');

    for (var i = 0; i < all.length; i++) {
      all[i].style.backgroundColor = backgroundColor;
    } // Configure text elements


    d3.selectAll("#scatter text").style("fill", textColor);
    svg.selectAll('path').attr('stroke', textColor); // document.getElementById('scatter-tooltip').style.backgroundColor = backgroundColor;
  });
}

window.addEventListener('resize', paint);
paint(); // add event listeners

document.getElementById('reset-icon').addEventListener('click', reset);
document.getElementById('spy-mode-button').addEventListener('click', spyMode); // add functionality to buttons

function reset() {
  color1 = 'rgba(141, 172, 198, 1)';
  backgroundColor = 'rgba(218, 209, 210, 1)';
  textColor = 'black';
  paint();
}

function spyMode() {
  color1 = 'rgba(137, 255, 0, 1)';
  backgroundColor = 'black';
  textColor = 'rgba(137, 255, 0, 1)';
  paint();
}