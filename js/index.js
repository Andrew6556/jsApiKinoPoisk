"use strict";

// import Card from "../modules/Card.js";
// import Header from "../modules/Header.js";
// import Modal from "../modules/Modal.js";
const data_movie = `https://kinopoiskapiunofficial.tech/api/v2.2/films/700/facts`,
    irl_movie    = `https://kinopoiskapiunofficial.tech/api/v2.2/films/top`;
// let film_fact = document.querySelector(".header__FactFilm-text");
const xhr = new XMLHttpRequest();
// console.log('UNSENT', xhr.readyState)
xhr.onreadystatechange = function () {
    // console.log(this.status)
    // console.log(this.readyState)
    if (this.readyState == 4 && this.status == 200){
        console.log(JSON.parse(this.response).films[0])
        document.querySelector(".card__img-item").src = JSON.parse(this.response).films[19].posterUrl
        // console.log(JSON.parse(this.response))
        // console.log(JSON.parse(this.response).films[0].posterUrl)



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
xhr.open('GET', irl_movie, true);
xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
xhr.setRequestHeader("X-API-KEY", '4ed6a4de-1c65-48b4-9d9b-922f9cfbd78e');
xhr.send();

function mtRandom(min){
    return Math.floor(Math.random() * ((JSON.parse(this.response).items.length - 1) - min + 1))
}
