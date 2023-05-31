"use strict";

import {Card} from "../modules/Card.js";
import {Header} from "../modules/Header.js";
import {Slider} from "../modules/Slider.js";



let keyword_search = name => `http://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${name}&page=1`,
    films_videos   = id   => `http://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/videos`,
    films_img      = id   => `http://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/images`,
    path_facts     = `data/fact_film.json`,
    films          = `data/info_films.json`;




let options = {
    headers: {
        'X-API-KEY': '4ed6a4de-1c65-48b4-9d9b-922f9cfbd78e',
        'Content-Type': 'application/json; charset=UTF-8',
    }
}


let header = new Header().wrapper;
document.querySelector(".wrapper").appendChild(header);

document.querySelector(".modalFilm__close").addEventListener("click", () =>{
    document.querySelector(".modalFilm").classList.toggle("active")
})

document.querySelector(".form").addEventListener("submit", async function(link){
    link.preventDefault();
    let value_search = this.querySelector(".header__searchBox").value;
        
    let result_search = await fetch(keyword_search(value_search), options),
        found_movies  = await result_search.json()
    if (found_movies.films.length != 0){
        document.querySelector(".header__NothingFound").classList.add("header__NothingFound_active")
        if(document.querySelector(".slider") != null){
            document.querySelector(".slider").remove()
        }
        create_slider(films_videos, films_img, keyword_search(value_search))
            .then(div_cards => document.querySelector(".header__films").appendChild(new Slider(div_cards).wrapper))

    }else{
        document.querySelector(".slider").remove()
        document.querySelector(".header__NothingFound").classList.remove("header__NothingFound_active")
    }
})

async function create_slider(path_trailer, path_img, path_films){
    let response_films = await fetch(path_films, options),
        initial_films  = await response_films.json();

    let div_card = initial_films.films.map(film  => new Card(film).wrapper);

    div_card.forEach(card => {
        card.querySelector(".card__btn").addEventListener("click", async (event) => {
            let div_title = event.target.closest(".card").querySelector(".card__title").innerText,
                film_year = event.target.closest(".card").querySelector(".card__year").innerText,
                card_info = initial_films.films.find(film => film.nameRu == div_title && film.year == film_year);
                //нахождения того обьекта ,по которому был клик
                let [response_trailer, response_pictures] = await Promise.all([
                                fetch(path_trailer(card_info.filmId), options),
                                fetch(path_img(card_info.filmId),     options)])

                let movie_trailer = await response_trailer.json(),
                    movie_picture = await response_pictures.json();
                
                adding_pictures_modal(movie_picture)
                
                document.querySelector(".modalFilm__title").innerText        = card_info.nameRu;
                document.querySelector(".modalFilm__description").innerText  = card_info.description;
                document.querySelector(".modalFilm__video-item").src         = get_working_link(movie_trailer);
        })
    })
    return div_card
}

function adding_pictures_modal(images){
    // при отсутвие допустимого значения картинок, скрываем блок modalFilm__galley
    if(images.items.length > 3){
        for (let i = 0; i < 3; i++){
            document.querySelectorAll(".modalFilm__img-item")[i].src = images.items[i].imageUrl
            document.querySelector(".modalFilm__galley").style.display = 'block';
        }
    }else{
        document.querySelector(".modalFilm__galley").style.display = 'none';
    }
}

function mtRandom(min, max){
    // получаем рандоиное число
    return Math.floor(Math.random() * (max - min + 1))
}

function get_formatted_fact(films_fact){
    // получаем отредактированный рандомный факт
    let random_fact = mtRandom(0,films_fact.items.length - 1);
    return films_fact.items[random_fact].text.replace(/<\/?[^>]+(>|$)/g, "")
}

function get_working_link(links){
    let formatted_link;
    for(let i = 0 ; i < links.items.length; i++){
        // Находим только ссылку на ютуб
        if(links.items[i].url.search("https://www.youtube.com/") == 0){
            // форматируем ее чтоб была рабочей
            formatted_link = links.items[i].url.search("/v/") == -1 ? links.items[i].url.replace('watch?v=', 'embed/'):
                                                                        links.items[i].url.replace('/v/', '/embed/');
            break
        }
    }
    return formatted_link
}

create_slider(films_videos, films_img, films)
    .then(div_cards => document.querySelector(".header__films").appendChild(new Slider(div_cards).wrapper))




async function deduce_random_fact(){
    return await new Promise(resolve => setInterval(async function(){
        let get_data   = await fetch(path_facts, options),
            facts_films = await get_data.json();

        let rm_fact_index = mtRandom(0,facts_films.length - 1);
        resolve(get_formatted_fact(facts_films[rm_fact_index]))
    }, 1000));
}
deduce_random_fact().then(random_fact =>{
    if (random_fact){
        document.querySelector(".FactLoading").classList.add("FactLoading_active");
    }
    document.querySelector(".header__FactFilm-text").innerText = random_fact;
})




