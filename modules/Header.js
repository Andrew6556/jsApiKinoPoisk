"use strict";


export default class Header{
    constructor(){
        this.wrapper = document.createElement("header")
        this.wrapper.classList.add("header")
        this.wrapper.innerHTML = `
                <div class="header__top">
                    <div class="header__topContent container">
                        <div class="header__logo">Ваш любимый <br><span class="header__logoDecor">Кинотеатр</span></div>
                        <form class="form" action="#">
                            <input class="header__searchBox" type="text" name="Search" placeholder="Фильмы, сериалы, персоны">
                            <button type="submit" class="form__btn"><img class="form__btn-svg" src="./img/icon/search.svg" alt="search"></button>
                        </form>
                    </div>
                    <!-- header__topContent -->
                </div>
                <div class="header__content container">
                    <div class="header__title title">Смотрите фильмы <br> на вашей любимой платформе</div>
                    <div class="header__wrapper">
                        <div class="header__FactFilm">
                            <div class="header__FactFilm-title">
                                Интересные факты из <span class="header__logoDecor">КиноИндустрии</span>
                            </div>
                            <div class="header__FactFilm-content">
                                <div class="FactLoading">
                                    <span class="FactLoading__text">Мы подбираем интересный <br>факт для вас...</span>
                                </div>
                                <div class="header__FactFilm-text">

                                </div>
                                <p class="header__FactFilm-name">
                                    
                                </p>
                            </div>
                        </div>
                        <div class="header__films">
                            <div class="header__NothingFound header__NothingFound_active">Ничего не найдено</div>
                        </div>
                    </div>
                </div> `
    }
}