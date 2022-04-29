import puppeteer from "puppeteer";
import axios from "axios";
import { JSDOM } from "jsdom";



const wikipediaUrl = 'https://fr.wikipedia.org/wiki/Canton_(Suisse)#Donn%C3%A9es_cantonales';


//screenshot
(async() => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 800 })
    await page.goto(wikipediaUrl)
    await page.screenshot({ path: 'wikipedia.png' })
    await browser.close()
})();


//cantons
(async() => {
    const response = await axios.get(wikipediaUrl)

    const dom = new JSDOM(response.data);

    let cantons = dom.window.document.querySelectorAll("table.wikitable tr");

    for (const canton of cantons) {
        try {
            const initial = canton.querySelector("th").textContent;
            const name = canton.querySelector("td a").textContent;
            let populationString = canton.querySelector("td bdi").textContent.replace("+", "").replace(",", "").replace(" ", "").replace("  ", "");
            populationString = populationString.split("").map((c) => parseInt(c)).filter((c) => !isNaN(c)).join("");
            const population = parseInt(populationString.toString());
            console.log(name, population);
        } catch (error) {
            ///console.log("error");
        }
    }
})();

//ecommerce

const shoppingUrl = "https://www.webscraper.io/test-sites/e-commerce/allinone/computers/laptops";
(async() => {
    const response = await axios.get(shoppingUrl)

    const dom = new JSDOM(response.data);

    let p = dom.window.document.querySelectorAll(".col-sm-4.col-lg-4.col-md-4");
    //console.log(p[0].querySelectorAll("div.ratings p")[1].getAttribute("data-rating"));
    const products = [];
    for (const product of p) {
        try {
            const name = product.querySelector("a.title").textContent;
            const price = product.querySelector("h4.price").textContent;
            const rating = product.querySelectorAll("div.ratings p")[1].getAttribute("data-rating");
            console.log(name, price);
            products.push({
                name: name,
                price: price,
                rating: rating
            });
        } catch (error) {
            ///console.log("error");
        }
    }

    console.log(products);
})();