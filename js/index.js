"use strict";

import Card from "../modules/Card.js";
import Header from "../modules/Header.js";
import {Slider} from "../modules/Slider.js";


let path_facts    = `data/fact_film.json`,
    films         = `data/info_films.json`,
    films_trailer = `data/trailer.json`,
    movie_img     = `data/img_films.json`;



let data_movie = [];

document.querySelector(".modalFilm__close").addEventListener("click", () =>{
    document.querySelector(".modalFilm").classList.toggle("active")
})

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
document.querySelector(".form").addEventListener("submit", (link) =>{
    // link.preventDefault();
    request("http://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=титан&page=1").then(film => {
        console.log(film)
        let films = film.films.map(item => {
            console.log(item)
            data_movie.push({name:item.nameRu,id:item.kinopoiskId,description:item.description})
            return new Card(item).wrapper
        })
        
        return films
    }).then(films=>{
        document.querySelector(".header__films").appendChild(new Slider(films).wrapper)

    })
    // request("http://kinopoiskapiunofficial.tech/api/v2.1/films/511").then(film => {
    //     console.log(film)
    // })
    // link.preventDefault();
    // if (modal.validation(link.target, data.add_card) !== false){
    //     link.target.reset()
    // }
})




function create_slider(){
    Promise.all([request(films), request(films_trailer), request(movie_img)]).then(data=>{
        return [data[0].map(item => {
            data_movie.push({name:item.nameRu,id:item.kinopoiskId,description:item.description})
            return new Card(item).wrapper
        }), data[1], data[2]]
    }).then(data=>{
        data[0].forEach(card =>{
            card.querySelector(".card__btn").addEventListener("click", (event) => {
                let card_title = event.target.closest(".card").querySelector(".card__title").innerText,
                    card_info  = data_movie.find(card => card.name == card_title);
                
                let url_trailer = data[1].map(trailer => {
                    if(trailer.id == card_info.id){
                        return trailer.items.url
                    }
                }).filter(data => data !== undefined)[0];

                let film_img = data[2].find(img => img.id == card_info.id);
                for (let i = 0; i < 3; i++){
                    document.querySelectorAll(".modalFilm__img-item")[i].src = film_img.items[i].imageUrl
                }
                document.querySelector(".modalFilm__title").innerText        = card_info.name;
                document.querySelector(".modalFilm__description").innerText  = card_info.description;
                document.querySelector(".modalFilm__video-item").src         = url_trailer;
            })
        })
        document.querySelector(".header__films").appendChild(new Slider(data[0]).wrapper)
    })
    .catch(error =>{
        console.log(error)
    })
}

// create_slider()






function get_formatted_fact(films_fact){
    let random_fact = mtRandom(0,films_fact.items.length - 1);
    return films_fact.items[random_fact].text.replace(/<\/?[^>]+(>|$)/g, "")
}

function mtRandom(min, max){
    return Math.floor(Math.random() * (max - min + 1))
}
function get_id(data){
    let list_id = data.map(film => film.id)
    return list_id[mtRandom(0,list_id.length - 1)]
}

let count = 0;

setInterval(function(){
    request(path_facts).then(fact=>{
        let rm_id = get_id(data_movie);
        // Попробуй сократить потом!!!
        while(true){
            let rm_fact_index = mtRandom(0,fact.length - 1);
            if(fact[rm_fact_index].id == rm_id){
                return data_movie.map(film => {
                    if (film.id == fact[rm_fact_index].id){
                        return [film.name,get_formatted_fact(fact[rm_fact_index])]
                    }
                }).filter(data => data !== undefined)
            }
        }
        
    }).then(random_fact=>{
        count++
        if (count == 1){
            document.querySelector(".FactLoading").classList.toggle("FactLoading_active");
        }
        document.querySelector(".header__FactFilm-text").innerText = random_fact[0][1];
        document.querySelector(".header__FactFilm-name").innerText = `Фильм:${random_fact[0][0]}`;
    })
},20000)