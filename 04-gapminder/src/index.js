import * as d3 from 'd3'
import life from '../data/life_expectancy_years.csv';
import map from '../data/map.json'


let w = screen.availWidth;
let h = screen.availHeight - 100;

var svg = d3.select("svg").attr("width", w).attr("height", h);

// Map and projection
var projection = d3.geoMercator()
    .center([0, 10])
    .scale([w / (2 * Math.PI)])
    .translate([w / 2, h / 2]);

var path = d3.geoPath().projection(projection);



// Data and color scale
var myColor = d3.scaleLinear().domain([50, 100])
    .range(["white", "blue"])

// Load external data and boot
/* d3.queue()
    .defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
    .defer(d3.csv, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world_population.csv", function(d) { data.set(d.code, +d.pop); })
    .await(ready);
 */

// Draw the map
svg.append("g")
    .selectAll("path")
    .data(map.features)
    .enter()
    .append("path")
    // draw each country
    .attr("d", path)
    // set the color of each country
    .attr("fill", function(d) {
        const data = getLifeEsperancyForCountry(d["properties"]["name"]);
        if (data) {
            /* console.log(data);
            console.log(d["properties"]["name"])*/
            return myColor(data);
        }
        return "red";
    });

function getLifeEsperancyForCountry(country) {
    try {
        const c = life.find((itmInner) => itmInner.country === country);
        return c["2021"];
    } catch (e) {
        console.log(country);
        return null;
    }
}