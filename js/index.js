"use strict";

import Card from "../modules/Card.js";
import Header from "../modules/Header.js";
import Modal from "../modules/Modal.js";
import {Slider} from "../modules/slider.js";


const   url           = `https://kinopoiskapiunofficial.tech/`,
        facts         = `api/v2.2/films/{id}/facts`,
        movie         = `api/v2.2/films/51`,
        movie_trailer = `api/v2.2/films/{id}/videos`,
        movie_img     = `api/v2.2/films/{id}/images`;

let div_cards  = [],
    data_movie = [];

function Request(count,callBack=""){
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200){
            console.log(JSON.parse(this.response));
            let response_api = JSON.parse(this.response);
            
            callBack(response_api)
        }
    };
    xhr.open('GET', `${url}${movie}${count}`, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    xhr.setRequestHeader("X-API-KEY", '4ed6a4de-1c65-48b4-9d9b-922f9cfbd78e');
    xhr.send();
}
for (let count = 0; count < 6; count++){
    Request(count, (data)=>{
            data_movie.push({
                name_movie:data.nameRu,
                id:data.kinopoiskId,
                description:data.description,
            })
            div_cards.push(new Card(data).wrapper)
        })
}
setTimeout(function(){
    document.querySelector(".header__films").appendChild(new Slider(div_cards).wrapper)
},1000)



//     Request(count)
// } 
// console.log(div_cards)
// let slider = new Slider(div_cards);
// document.querySelector(".header__films").appendChild(slider.wrapper);

// console.log(data_movie)

// function mtRandom(min){
//     return Math.floor(Math.random() * ((JSON.parse(this.response).items.length - 1) - min + 1))
// }
// готовый вариант смены факта на станице
            // setInterval(
            //     function(){
            //         let random_num = mtRandom.call(this,0)
            //         console.log(random_num)
            //         film_fact.innerText = JSON.parse(this.response).items[random_num].text.replace(/<\/?[^>]+(>|$)/g, "")
            //         // console.log(JSON.parse(xhr.response).items[random_num])
            //     }.bind(this),20000
            // )