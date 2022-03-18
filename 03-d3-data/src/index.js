import * as d3 from "d3";
import { json } from 'd3-fetch'




Promise.all([
        json('https://jsonplaceholder.typicode.com/users'),
        json('https://jsonplaceholder.typicode.com/posts')
    ])
    .then(([u, p]) => {
        buildDatas(u, p);
    });


function buildDatas(users, posts) {
    let datas = [];
    users.map((e) => {
        datas.push({
            "nom_utilisateur": e.name,
            "ville": e.address.city,
            "nom_companie": e.company.name,
            "titres_post": d3.filter(posts, p => p.userId == e.id).map((post) => post.title),
            "posts": d3.filter(posts, p => p.userId == e.id)
        });
    });
    displayOnDom(datas);
}

function displayOnDom(datas) {
    d3.select("#content")
        .data(datas)
        .enter()
        .append("p")
        .text(function(d) {
            console.log(d);
            return d.nom_utilisateur + " : " + d.posts.length;
        });


    let maxIndex = d3.maxIndex(datas, function(data) {
        return d3.max(data.posts, function(post) {
            return post.body.length;
        })
    });

    d3.select("#content")
        .append("p")
        .text(function(d) {
            return "Best writer : " + datas[maxIndex].nom_utilisateur;
        });

}