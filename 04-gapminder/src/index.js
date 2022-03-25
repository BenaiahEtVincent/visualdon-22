import * as d3 from 'd3'

import population from '../data/population_total.csv';
import pib from '../data/income_per_person_gdppercapita_ppp_inflation_adjusted.csv';
import life from '../data/life_expectancy_years.csv';


//pib.map((country) => country.map((data) => cleanData(data)));


let datas = [];
for (let index = 0; index < population.length; index++) {
    const name = population[index]["country"];

    const p = pib.find((itmInner) => itmInner.country === name);
    const l = life.find((itmInner) => itmInner.country === name);

    if (p && l) {
        datas.push({
            name: population[index]["country"],
            population: population[index],
            pib: p,
            life: l
        });
    }

}

let minPib = 10000000;

for (const country of datas) {
    for (const [key, v] of Object.entries(country.pib)) {
        let value = cleanData(v);
        if (minPib > value) minPib = value;
    }
}


let maxPib = 0;

for (const country of datas) {
    for (const [key, v] of Object.entries(country.pib)) {
        let value = cleanData(v);
        if (maxPib < value) maxPib = value;
    }
}




let maxLife = 0;

for (const country of datas) {
    for (const [key, v] of Object.entries(country.life)) {
        let value = cleanData(v);
        if (maxLife < value) maxLife = value;
    }
}






let minPop = 1000000000000000;

for (const country of datas) {
    for (const [key, v] of Object.entries(country.population)) {
        let value = cleanData(v);
        if (minPop > value) minPop = value;
    }
}


let maxPop = 0;

for (const country of datas) {
    for (const [key, v] of Object.entries(country.population)) {
        let value = cleanData(v);
        if (maxPop < value) maxPop = value;
    }
}



var margin = { top: 10, right: 20, bottom: 30, left: 50 },
    width = screen.availWidth - 100 - margin.left - margin.right,
    height = screen.availHeight - 300 - margin.top - margin.bottom;


const svg = d3.select('#population_income .chart')
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");


// Add X axis
var x = d3.scaleLog()
    .domain([minPib, 128000])
    .range([0, width]);
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

// Add Y axis
var y = d3.scaleLinear()
    .domain([0, maxLife])
    .range([height, 0]);
svg.append("g")
    .call(d3.axisLeft(y));

// Add a scale for bubble size
var z = d3.scaleLinear()
    .domain([minPop, maxPop])
    .range([1, 40]);


function displayDot(year) {
    //removeAllDot();

    // Add dots
    svg.append('g')
        .attr("id", "groupDot")
        .selectAll("dot")
        .data(datas)
        .enter()
        .append("circle")
        .attr("id", function(d) {
            return d.name
        })
        .attr("cx", function(d) {
            return x(cleanData(d.pib[year]));
        })
        .attr("cy", function(d) {
            return y(d.life[year]);
        })
        .attr("r", function(d) {
            return z(cleanData(d.population[year]));
        })
        .style("fill", "#69b3a2")
        .style("opacity", "0.7")
        .attr("stroke", "black")
        .on("mouseover", function(d) {
            d3.select("#tooltip").text(this.id);
        })

}

displayDot(2021)


/* let year = 1800;

document.getElementById("yearRange").min = year;
document.getElementById("yearRange").max = 2050;

document.getElementById("yearRange").addEventListener("change", function(event) {
    clearTimeout(interval)
    displayDot(this.value);
    document.querySelector("label").innerText = this.value;
    year = this.value;
    running = false;

})

let interval;

function runInterval() {

    interval = setInterval(() => {
        year++;
        displayDot(year);
        document.getElementById("yearRange").value = year;
        document.querySelector("label").innerText = year;

    }, 500);

}

let running = true;

d3.select("#play").on("click", function() {
    if (running) {
        clearTimeout(interval);
        document.getElementById("play").innerText = "Play";
        running = false;

    } else {
        runInterval()
        document.getElementById("play").innerText = "Pause";
        running = true;

    }
});

runInterval()

function removeAllDot() {
    svg.select("#groupDot").remove()
} */


function cleanData(data) {
    if (isNaN(data)) {
        if (data.includes("k")) {
            const n = data.split("k")[0];
            return Number.parseFloat(n) * 1000;
        } else if (data.includes("M")) {
            const n = data.split("M")[0];
            return Number.parseFloat(n) * 1000000;

        }
    }

    return data;
}