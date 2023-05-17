"use strict";

import Card from "../modules/Card.js";
import Header from "../modules/Header.js";
import {Slider} from "../modules/Slider.js";


let path_facts    = `data/fact_film.json`,
    films         = `data/info_films.json`,
    films_trailer = `data/trailer.json`,
    movie_img     = `data/img_films.json`;

let facts_films;

window.onload = function () {
    request(path_facts).then(fact=>{
        facts_films = fact
    })
}


document.querySelector(".modalFilm__close").addEventListener("click", () =>{
    document.querySelector(".modalFilm").classList.toggle("active")
})

let request = (path) =>{
    return new Promise((resolve, reject) =>{
        const xhr = new XMLHttpRequest();
        xhr.open("GET", path, true);
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
let keyword_search = name => `http://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${name}&page=1`,
    films_videos   = id   => `http://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/videos`,
    films_img      = id   => `http://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/images`;


document.querySelector(".form").addEventListener("submit", function(link){
    link.preventDefault();
    let value_search = this.querySelector(".header__searchBox").value
    request(keyword_search(value_search)).then(search_result =>{
        if (search_result.films.length != 0){
            document.querySelector(".slider").remove()
            create_slider(keyword_search(value_search), films_videos, films_img)
        }

    })
})




function create_slider(path_films, path_trailer, path_img){
    request(path_films).then(films =>{
        let div_card = films.films.map(film => new Card(film).wrapper);
        div_card.forEach(card =>{
            card.querySelector(".card__btn").addEventListener("click", (event) => {
                let div_title = event.target.closest(".card").querySelector(".card__title").innerText,
                    film_year  = event.target.closest(".card").querySelector(".card__year").innerText,
                    card_info = films.films.find(card => card.nameRu == div_title && card.year == film_year);
                
                // let promise_request = (path_films.search("json") != -1) ? Promise.all([request(card_info.filmId),request(path_img(card_info.filmId))]):
                //                                             Promise.all([request(path_trailer(card_info.filmId)),request(path_img(card_info.filmId))]);
                // console.log(promise_request)
                // console.log("path_trailer".search("json"))
                Promise.all([request(path_trailer(card_info.filmId)),request(path_img(card_info.filmId))]).then(data=>{
                    // console.log(data[1])
                    // console.log(data[0].items)
                    // console.log(data[0].items.length)
                    for (let i = 0; i < 3; i++){
                        document.querySelectorAll(".modalFilm__img-item")[i].src = data[1].items[i].imageUrl
                    }
                    var url = data[0].items[0].url.replace('v', 'embed');
                    document.querySelector(".modalFilm__title").innerText        = card_info.nameRu;
                    document.querySelector(".modalFilm__description").innerText  = card_info.description;
                    document.querySelector(".modalFilm__video-item").src         = url;
                })
            })
        })
        document.querySelector(".header__films").appendChild(new Slider(div_card).wrapper)
    })
}


create_slider(films, films_videos, films_img)


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


// setInterval(function(){
//     let rm_id = get_id(data_movie);
//     // Попробуй сократить потом!!!
//     while(true){
//         let rm_fact_index = mtRandom(0,facts_films.length - 1);
//         if(facts_films[rm_fact_index].id == rm_id){
//             let random_fact = data_movie.map(film => {
//                 if (film.id == facts_films[rm_fact_index].id){
//                     return [film.name,get_formatted_fact(facts_films[rm_fact_index])]
//                 }
//             }).filter(data => data !== undefined);
//             add_fact(random_fact)
//             break
//         }
//     }
// },20000)

function add_fact(random_fact){
    count++
    if (count == 1){
        document.querySelector(".FactLoading").classList.toggle("FactLoading_active");
    }
    document.querySelector(".header__FactFilm-text").innerText = random_fact[0][1];
    document.querySelector(".header__FactFilm-name").innerText = `Фильм:${random_fact[0][0]}`;
}