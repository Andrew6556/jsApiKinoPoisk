"use strict";

// [{"kinopoiskId":510,"imdbId":"tt0053198","nameRu":"Четыреста ударов","nameEn":null,"nameOriginal":"Les quatre cents coups","posterUrl":"https://kinopoiskapiunofficial.tech/images/posters/kp/510.jpg","posterUrlPreview":"https://kinopoiskapiunofficial.tech/images/posters/kp_small/510.jpg","coverUrl":null,"logoUrl":null,"reviewsCount":58,"ratingGoodReview":92.9,"ratingGoodReviewVoteCount":50,"ratingKinopoisk":8.1,"ratingKinopoiskVoteCount":22759,"ratingImdb":8.1,"ratingImdbVoteCount":121376,"ratingFilmCritics":9.4,"ratingFilmCriticsVoteCount":71,"ratingAwait":null,"ratingAwaitCount":0,"ratingRfCritics":null,"ratingRfCriticsVoteCount":1,"webUrl":"https://www.kinopoisk.ru/film/510/","year":1959,"filmLength":98,"slogan":"Det franske mesterværk om de unge i lømmelalderen","description":"12-летний Антуан Дуанель — трудный подросток. Его мать занята личной жизнью, и у нее нет ни времени, ни желания вникать в проблемы сына. Отчим — человек слабохарактерный, не имеет влияния ни на жену, ни на сына. Учитель лишь наказывает мальчика. Антуан и его приятель все реже посещают школу и убегают из дома.","shortDescription":null,"editorAnnotation":null,"isTicketsAvailable":true,"productionStatus":null,"type":"FILM","ratingMpaa":null,"ratingAgeLimits":"age16","countries":[{"country":"Франция"}],"genres":[{"genre":"драма"},{"genre":"криминал"}],"startYear":null,"endYear":null,"serial":false,"shortFilm":false,"completed":false,"hasImax":false,"has3D":false,"lastSync":"2023-04-18T11:23:41.034351"}]

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