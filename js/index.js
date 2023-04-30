"use strict";

import Card from "../modules/Card.js";
import Header from "../modules/Header.js";
import Modal from "../modules/Modal.js";
import {Slider} from "../modules/slider.js";


        // facts         = `511/facts`,
        // movie         = `51`,
        // movie_trailer = `{id}/videos`,
        // movie_img     = `{id}/images`;

let path_facts    = (id) => `${id}/facts`,
    films         = (id) => `${id}`,
    films_trailer = (id) => `${id}/videos`,
    movie_img     = (id) => `${id}/images`;



let div_cards  = [],
    data_movie = [];

function Request(url,callBack){
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200){
            // console.log(JSON.parse(this.response))

            let response_api = JSON.parse(this.response);
            callBack(response_api);
            console.log(callBack(response_api))
        }
    };
    xhr.open('GET', `https://kinopoiskapiunofficial.tech/api/v2.2/films/51${url}`, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    xhr.setRequestHeader("X-API-KEY", '4ed6a4de-1c65-48b4-9d9b-922f9cfbd78e');
    xhr.send();
}
for (let count = 0; count < 6; count++){
    Request(films(count),(data)=>{
            data_movie.push({
                name_movie:data.nameRu,
                id:data.kinopoiskId,
                description:data.description,
                fact: setTimeout(function(){
                            return Request(path_facts(count), add_fact_about_movie)
                    },1000)
            })
            div_cards.push(new Card(data).wrapper)
        });
    // setTimeout(function(){
    //         Request(path_facts(count), add_fact_about_movie,count)
    // },3000)
    
}
// setTimeout(function(){
//     console.log(data_movie)
//     document.querySelector(".header__films").appendChild(new Slider(div_cards).wrapper)
// },2000)

function add_fact_about_movie(films_fact){
    let random_fact = mtRandom(0,films_fact.items.length - 1);
    console.log(films_fact.items[random_fact].text.replace(/<\/?[^>]+(>|$)/g, ""))
    return films_fact.items[random_fact].text.replace(/<\/?[^>]+(>|$)/g, "")
}



// setInterval(function(){
//     let random_num = mtRandom.call(this,0,JSON.parse(this.response).items.length - 1)
//     console.log(random_num)

//     document.querySelector(".header__FactFilm-text").innerText = JSON.parse(this.response).items[random_num].text.replace(/<\/?[^>]+(>|$)/g, "")
// }.bind(this),2000
// )
function mtRandom(min, max){
    return Math.floor(Math.random() * (max - min + 1))
}