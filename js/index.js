"use strict";

// import Card from "../modules/Card.js";
// import Header from "../modules/Header.js";
// import Modal from "../modules/Modal.js";
// import {Slider} from "../modules/slider.js";


let path_facts    = (id) => `${id}/facts`,
    films         = (id) => `${id}`,
    films_trailer = (id) => `${id}/videos`,
    movie_img     = (id) => `${id}/images`;



let data_movie = [];



let request = (url="https://kinopoiskapiunofficial.tech/api/v2.2/films/511",rq_type="GET") =>{
    return new Promise((resolve, reject) =>{
        const xhr = new XMLHttpRequest();
        xhr.open(rq_type, `${url}`, true);
        xhr.onload = () => {
            if (xhr.status == 200){
                // console.log(JSON.parse(this.response))
                resolve(xhr.response)
            }else{
                reject("Errrrrrrrrrrrrrrrrooooooooor")
            }
        };
        xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
        xhr.setRequestHeader("X-API-KEY", '4dc0fb6b-92e7-4e5d-b3c6-960b4ce6443d');
        xhr.send();
    })
}


















function get_data_cards() {
    for (let count = 0; count < 6; count++){
        // request(films(count)).then(data_film =>{
        //     return request(path_facts(count))
        //     .then(fact_film=>{
        //             data_movie.push({
        //                 name_movie:data_film.nameRu,
        //                 id:data_film.kinopoiskId,
        //                 description:data_film.description,
        //                 fact:add_fact_about_movie(fact_film),
        //             })
        //             div_cards.push(new Card(data_film).wrapper)
        //             console.log(data_movie)
        //         }
        //     )
        // })
    }
}
// document.querySelector(".header__films").appendChild(new Slider(div_cards).wrapper)
// console.log(get_data_cards())
// request(films(2))
// .then(data=>{
//     console.log(data)
// })
// for (let count = 0; count < 6; count++){

//     Request(path_facts(count), add_fact_about_movie)
//     setTimeout(function(){
//         Request(films(count),(data)=>{
//             data_movie.push({
//                 name_movie:data.nameRu,
//                 id:data.kinopoiskId,
//                 description:data.description,
//                 fact:fact,
//             })
//             div_cards.push(new Card(data).wrapper)
//         });
//     },500)
    
    // setTimeout(function(){
    //         Request(path_facts(count), add_fact_about_movie,count)
    // },3000)
    
// }
// setTimeout(function(){
//     console.log(data_movie)
//     document.querySelector(".header__films").appendChild(new Slider(div_cards).wrapper)
// },2000)

function add_fact_about_movie(films_fact){
    let random_fact = mtRandom(0,films_fact.items.length - 1);
    return films_fact.items[random_fact].text.replace(/<\/?[^>]+(>|$)/g, "")
}

function mtRandom(min, max){
    return Math.floor(Math.random() * (max - min + 1))
}

// setInterval(function(){
//     let random_num = mtRandom.call(this,0,JSON.parse(this.response).items.length - 1)
//     console.log(random_num)

//     document.querySelector(".header__FactFilm-text").innerText = JSON.parse(this.response).items[random_num].text.replace(/<\/?[^>]+(>|$)/g, "")
// }.bind(this),2000
// )
