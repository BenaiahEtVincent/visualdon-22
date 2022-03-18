import * as d3 from 'd3';

console.log("ok");

const svg = d3.select("div")
    .append("svg")
    .attr("width", 300)
    .attr("height", 650);

const position = [50, 150, 250];
const r = 40;

for (let index = 0; index < 3; index++) {
    let g = svg.append("g");
    g.append("circle")
        .attr("r", r)
        .attr("cx", position[index])
        .attr("cy", position[index]);
    g.append("text")
        .attr("x", position[index])
        .attr("y", position[index] + r + 20)
        .attr("text-anchor", "middle")
        .text("ok");
}

svg.select("g:nth-child(2) circle")
    .attr("fill", "red");


for (let index = 1; index <= 2; index++) {
    svg.select("g:nth-child(" + index + ") circle")
        .attr("cx", parseInt(svg.select("g:nth-child(" + index + ") circle").attr("cx")) + 50)
        .select(function() { return this.parentNode; })
        .select("text").attr("x", parseInt(svg.select("g:nth-child(" + index + ") text").attr("x")) + 50);
}

svg.select("g:nth-child(3)").on("click", function() {
    svg.selectAll("g")
        .select("circle")
        .attr("cx", 100)
        .select(function() { return this.parentNode; })
        .select("text")
        .attr("x", 100);
});

const datas = [20, 5, 25, 8, 15];

const chart = svg.append("g").attr("transform", "translate(0,300)");

datas.forEach(element => chart.append("rect"));

const factor = 8;
const widthRect = 20;

chart.selectAll("rect")
    .data(datas)
    .attr('x', (d, i) => widthRect * i)
    .attr('y', (d) => 100 - factor * d)
    .attr('width', widthRect)
    .attr('height', (d) => factor * d)
    .attr('stroke', 'black')
    .attr('fill', '#69a3b2');
/* .enter()
.attr('x', 10)
.attr('y', 120)
.attr('width', 20)
.attr('height', 100)
.attr('stroke', 'black')
.attr('fill', '#69a3b2'); */