"use strict";



export default class Header{
    constructor(){
        this.wrapper = document.createElement("header")
        this.wrapper.classList.add("header")
        this.wrapper.innerHTML = `
                <div class="header__top">
                    <div class="header__navbar container">
                        <button class="header__form">Форма</button>
                    </div>
                </div>
                <div class="header__content container">
                    <div class="films">
                        <div class="films__wrapper">
                            
                        </div>
                        <!-- cards__wrapper -->
                    </div>
                </div> `
    }
}