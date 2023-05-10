"use strict";

import Card from "../modules/Card.js";
import Header from "../modules/Header.js";
import Modal from "../modules/Modal.js";
import {Slider} from "../modules/slider.js";


let path_facts    = `data/fact_film.json`,
    films         = `data/info_films.json`,
    films_trailer = `data/trailer.json`,
    movie_img     = `data/img_films.json`;



let data_movie = [];



let request = (path) =>{
    return new Promise((resolve, reject) =>{
        const xhr = new XMLHttpRequest();
        xhr.open("GET", `${path}`, true);
        xhr.onload = () => {
            if (xhr.status == 200){
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


function create_slider(){
    request(films).then(data =>{
        let div_cards = data.map(item => {
            data_movie.push({name:item.nameRu,id:item.kinopoiskId,description:item.description})
            return new Card(item).wrapper
        })
        document.querySelector(".header__films").appendChild(new Slider(div_cards).wrapper)
    })
}
create_slider()


function add_fact_about_movie(films_fact){
    let random_fact = mtRandom(0,films_fact.items.length - 1);
    return films_fact.items[random_fact].text.replace(/<\/?[^>]+(>|$)/g, "")
}

function mtRandom(min, max){
    return Math.floor(Math.random() * (max - min + 1))
}
function get_id(data){
    let list_id = data.map(film => film.id)
    return list_id[mtRandom(0,list_id.length -1)]
}

let count = 0;

setInterval(function(){
    request(path_facts).then(fact=>{
        let rm_fact_index = mtRandom(0,fact.length -1),
            rm_id         = get_id(data_movie);

        console.log(fact[rm_fact_index])
        while(true){
            if(fact[rm_fact_index].id == rm_id){
                console.log(fact[rm_fact_index].id,rm_id)
                let formatted_fact = fact[rm_fact_index].items[random_fact].text.replace(/<\/?[^>]+(>|$)/g, "")
                // if ()
                let a = data_movie.map(film => {
                    if (film.id == fact[rm_fact_index].id){
                        console.log(film.name)
                    }
                })
                // return [formatted_fact, data_movie[count].name]
                // break
            }
        }
        
    }).then(random_fact=>{
        count++
        if (count == 1){
            document.querySelector(".FactLoading").classList.toggle("FactLoading_active");
        }
        document.querySelector(".header__FactFilm-text").innerText = random_fact[0];
        document.querySelector(".header__FactFilm-name").innerText = `Фильм:${random_fact[1]}`;
        console.log(random_fact)
    })
},1000)
