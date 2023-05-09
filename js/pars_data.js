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