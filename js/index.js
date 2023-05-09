"use strict";

import Card from "../modules/Card.js";
import Header from "../modules/Header.js";
import Modal from "../modules/Modal.js";
import {Slider} from "../modules/slider.js";


let path_facts    = (id) => `${id}/facts`,
    films         = (id) => `${id}`,
    films_trailer = (id) => `${id}/videos`,
    movie_img     = (id) => `${id}/images`;



let data_movie = [];



let request = () =>{
    return new Promise((resolve, reject) =>{
        const xhr = new XMLHttpRequest();
        xhr.open("GET", `data/info_films.json`, true);
        xhr.onload = () => {
            if (xhr.status == 200 || xhr.status == 201){
                // console.log(JSON.parse(this.response))
                resolve(JSON.parse(xhr.response))
            }else{
                reject("Errrrrrrrrrrrrrrrrooooooooor")
            }
        };
        xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
        xhr.setRequestHeader("X-API-KEY", '4dc0fb6b-92e7-4e5d-b3c6-960b4ce6443d');
        xhr.send();
    })
}


function get_data_cards(){
    request().then(data =>{
        let div_cards = data.map(item => new Card(item).wrapper)
        document.querySelector(".header__films").appendChild(new Slider(div_cards).wrapper)
    })
        // for (let count = 0; count < 6; count++){
            // request().then(data_film =>{
            //     console.log(data_film[count])
            //     let c = data_film[count]
            //     div_cards.push(new Card(c).wrapper)
                // return 
                // return request(path_facts(count))
                // .then(fact_film=>{
                //         data_movie.push({
                //             name_movie:data_film.nameRu,
                //             id:data_film.kinopoiskId,
                //             description:data_film.description,
                //             fact:add_fact_about_movie(fact_film),
                //         })
                //         div_cards.push(new Card(data_film).wrapper)
                //         console.log(data_movie)
                //     }
                // )
        // })
    // }
    
    
}
get_data_cards()
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
