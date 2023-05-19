"use strict";

export class Card{
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
                        <p class="card__text">Год выпуска:<span class="card__decor card__year">${data.year}</span></p>
                        <p class="card__text">Оценка зрителей:<span class="card__decor">${data.rating}</span></p>
                    </div>
                    <button class="card__btn btn">Узнать больше</button>
                </div>`;
        this.wrapper.querySelector(".card__btn").addEventListener("click", () =>{
            document.querySelector(".modalFilm").classList.toggle("active")
        })
    }
}
