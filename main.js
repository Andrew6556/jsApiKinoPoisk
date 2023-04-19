//! readyState
//? 0 -- UNSET           -- Создан и ещё не вызван open()
//? 1 -- OPENED          -- Вызван open, можно send()
//? 2 -- HEADERS_RECIEVD -- send() вызван, получены загаловки и код ответа (200, 404 ...)
//? 3 -- LOADING         -- Загрузка
//? 4 -- DONE            -- Данные получены, операция завершена

const   url   = "https://jsonplaceholder.typicode.com/posts/",
        xhr   = new XMLHttpRequest(),
        title = document.querySelector('.title'),
        form  = document.querySelector('.form');

xhr.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200){
        set_title(JSON.parse(this.response))
    } else if (this.readyState == 4 && this.status == 404){
        set_title("Кажется, заголовка с таким id не сущесвует :(")
    }
}

function set_title(response){
    title.innerText = typeof response == "string" ? response : response.title
}

function send_data(post_id){
    xhr.open("GET", `https://jsonplaceholder.typicode.com/posts/${post_id}`, true)
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
    xhr.send()
}

form.querySelector('button').addEventListener('click', function(){
    send_data(form.querySelector('input').value)
})

// post запрос
// let xhttp = new XMLHttpRequest();

// xhttp.onreadystatechange = function(){
//     if (this.readyState == 4 && this.status == 200){
//         console(this.response)
//     }
// }

// xhttp.open("POST", `https://jsonplaceholder.typicode.com/posts/`, true)
// xhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
// xhttp.send(JSON.stringify({
//     title: 'Наш заголовок',
//     body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro ratione nemo vero sint ipsum, reprehenderit similique deserunt inventore praesentium corporis quibusdam, id, temporibus fugit. Soluta veritatis modi architecto ea rerum dolorum iure perferendis possimus officiis voluptatibus, qui illum similique!'
// }))

