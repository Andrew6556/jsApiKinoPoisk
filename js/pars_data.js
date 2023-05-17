var fetch = require('node-fetch');
function ccc(num){
    fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/51${num}/images`, {
    method: 'GET',
    headers: {
        'X-API-KEY': 'a85d700b-c477-4ca6-ad39-0e281102a9e5',
        'Content-Type': 'application/json',
    },
    }).then((response) => {
        return response.json();
    })
    .then((api_response) => {
        const fs = require('fs'); 
        fs.readFile('data/img_films.json', (err, data) => {
            if (err) {
                console.error(err)
                return
            }
            let data_pars = JSON.parse(data);
            // let c = num
            // console.log(data_pars[c])
            api_response["id"] = `51${num}`
            data_pars.push(api_response);
            // data_pars[c]["id"] = `51${num}`;
            fs.writeFile('data/img_films.json', JSON.stringify(data_pars), (err) => {
                if (err) {
                    console.log(err)
                    return
                }
            })
        })
    })
}
// Promise.all([request(path_films), request(path_trailer), request(path_img)]).then(data=>{
    //     console.log([data[0], data[1], data[2]])
    //     let div_card = data[0].films.map(film => new Card(film).wrapper);
    //     div_card.forEach(card =>{
    //         card.querySelector(".card__btn").addEventListener("click", (event) => {
    //             let div_title = event.target.closest(".card").querySelector(".card__title").innerText,
    //                 card_info = data[0].films.find(card => card.nameRu == div_title);
                
                    
    //             console.log(card_info)
    //             let url_trailer = data[1].items.map(trailer => {
    //                 if(trailer.filmId == card_info.filmId){
    //                     return trailer.items.url
    //                 }
    //             }).filter(data => data !== undefined)[0];
    //             console.log(url_trailer)
    //             let film_img = data[2].find(img => img.filmId == card_info.filmId);
    //             for (let i = 0; i < 3; i++){
    //                 document.querySelectorAll(".modalFilm__img-item")[i].src = film_img.items[i].imageUrl
    //             }
    //             document.querySelector(".modalFilm__title").innerText        = card_info.nameRu;
    //             document.querySelector(".modalFilm__description").innerText  = card_info.description;
    //             document.querySelector(".modalFilm__video-item").src         = url_trailer;
    //         })
    //     })
    //     document.querySelector(".header__films").appendChild(new Slider(div_card).wrapper)
    // })
    
    // .catch(error =>{
    //     console.log(error)
    // })