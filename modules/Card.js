"use strict";

export default class Card{
    constructor(data){
        this.wrapper = document.createElement("div");
        this.wrapper.classList.add("card");
        this.wrapper.innerHTML = `
                <div class="card__img">
                    <img class="card__img-item" src="${data.posterUrl}" alt="#">
                </div>
                <div class="card__title title">${data.nameRu}</div>
                <div class="card__inner">
                    <div class="card__wrapper">
                        <p class="card__text">Режиссер:<span class="card__decor">Классный</span></p>
                        <p class="card__text">Год выпуска:<span class="card__decor">${data.year}</span></p>
                        <p class="card__text">Оценка зрителей:<span class="card__decor">${data.ratingKinopoisk}</span></p>
                    </div>
                    <button class="card__btn btn">Узнать больше</button>
                </div>`;
        this.wrapper.querySelector(".card__btn").addEventListener("click", () =>{
            document.querySelector(".modalFilm").classList.toggle("active")
        })
    }
}
// .then(data=>{
    //     data[0].forEach(card =>{
    //         card.querySelector(".card__btn").addEventListener("click", (event) => {
    //             let card_title = event.target.closest(".card").querySelector(".card__title").innerText,
    //                 card_info  = data_movie.find(card => card.name == card_title);
                
    //             let url_trailer = data[1].map(trailer => {
    //                 if(trailer.filmId == card_info.filmId){
    //                     return trailer.items.url
    //                 }
    //             }).filter(data => data !== undefined)[0];

    //             let film_img = data[2].find(img => img.filmId == card_info.filmId);
    //             for (let i = 0; i < 3; i++){
    //                 document.querySelectorAll(".modalFilm__img-item")[i].src = film_img.items[i].imageUrl
    //             }
    //             document.querySelector(".modalFilm__title").innerText        = card_info.name;
    //             document.querySelector(".modalFilm__description").innerText  = card_info.description;
    //             document.querySelector(".modalFilm__video-item").src         = url_trailer;
    //         })
    //     })
    //     document.querySelector(".header__films").appendChild(new Slider(data[0]).wrapper)
    // })