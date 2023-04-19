"use strict";

export default class Card{
    constructor(data){
        this.wrapper = document.createElement("div");
        this.wrapper.classList.add("card");
        this.wrapper.innerHTML = `
                <div class="card__img block__img">
                    <img class="card__image-item" src="${data.url}" alt="#" >
                </div>
                <div class="card__title title">${data.name}</div>
                <div class="card__buttons">
                    <button class="card__btn card__btn_open">Open</button>
                    <button class="card__btn card__btn_del">Delete</button>
                </div>`;
        this.wrapper.querySelector(".card__btn_del").addEventListener("click", () =>{
            this.wrapper.classList.add('animate');
            setTimeout(() => this.wrapper.remove(), 1000);
        })
    }
}