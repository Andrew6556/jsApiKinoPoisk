"use strict";

import Card from "../modules/Card.js";
import Header from "../modules/Header.js";
import Modal from "../modules/Modal.js";


const data_movie = `https://kinopoiskapiunofficial.tech/api/v2.2/films/700/facts`,
    irl_movie    = `https://kinopoiskapiunofficial.tech/api/v2.2/films/top`;

let div_cards = []
function Request(count){
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200){
            console.log(JSON.parse(this.response));
            // document.querySelector(".card__img-item").src = JSON.parse(this.response).films[7].posterUrl
            // console.log(JSON.parse(this.response))
            // console.log(JSON.parse(this.response).films[0].posterUrl)
            // for (let i = )

            let card = new Card(JSON.parse(this.response));
            div_cards.push(card.wrapper)
            // готовый вариант смены факта на станице
            // setInterval(
            //     function(){
            //         let random_num = mtRandom.call(this,0)
            //         console.log(random_num)
            //         film_fact.innerText = JSON.parse(this.response).items[random_num].text.replace(/<\/?[^>]+(>|$)/g, "")
            //         // console.log(JSON.parse(xhr.response).items[random_num])
            //     }.bind(this),20000
            // )
            
        }
    };
    // xhr.open('GET', 'https://kinopoiskapiunofficial.tech/api/v2.2/films/516/facts', true);
    xhr.open('GET', `https://kinopoiskapiunofficial.tech/api/v2.2/films/51${count}`, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    xhr.setRequestHeader("X-API-KEY", '4ed6a4de-1c65-48b4-9d9b-922f9cfbd78e');
    xhr.send();
}

for (let count = 0; count < 6; count++){
    Request(count)
} 
// document.querySelector(".header__films").appendChild();

function mtRandom(min){
    return Math.floor(Math.random() * ((JSON.parse(this.response).items.length - 1) - min + 1))
}
