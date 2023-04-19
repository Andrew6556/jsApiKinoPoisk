"use strict";

// import Card from "../modules/Card.js";
// import Header from "../modules/Header.js";
// import Modal from "../modules/Modal.js";



var xhr = new XMLHttpRequest();
// console.log('UNSENT', xhr.readyState)
xhr.onreadystatechange = function () {
    console.log(this.status)
    console.log(this.readyState)
    if (this.readyState == 4 && this.status == 200){
        console.log(JSON.parse(this.response).films[0].posterUrl)
        // document.querySelector(".img").src = JSON.parse(this.response).films[0].posterUrl
    }
};

xhr.open('GET', 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top', true);
xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
xhr.setRequestHeader("X-API-KEY", '4ed6a4de-1c65-48b4-9d9b-922f9cfbd78e');


xhr.send();