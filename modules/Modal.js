"use strict";

export default class Modal{
    constructor(data){
        this.modalWrapper = data;
        this.modalWrapper.querySelector(".modal__close").addEventListener("click", () => {
            this.modalWrapper.classList.toggle("active")
        })
    }
    validation(form, create_card){
        const all_inputs = form.querySelectorAll(".form__input");
        function error_message(parent_div){
            parent_div.classList.add("form__item_error")
    
            let message_error = document.createElement("span");
            message_error.classList.add("form__error-text")
            message_error.innerText = "*Не заполнено данное поле";
    
            parent_div.appendChild(message_error)
        }
        function del_error(parent_div){
            if (parent_div.classList.contains("form__item_error")){
                parent_div.querySelector(".form__error-text").remove()
                parent_div.classList.remove("form__item_error")
            }
        }
        all_inputs.forEach(item =>{
            del_error(item.parentElement)
            if (item.value == ""){
                error_message(item.parentElement)
            }
        })
        const data_form = Array.from(all_inputs).map(item => item.value);
        return (data_form.includes("")) ? false : create_card(data_form);
    }
}