import { card, eventosCard} from "./card.js";

let containerCard = document.querySelector(".container");

document.addEventListener("DOMContentLoaded", () => {
    if (!containerCard) return;

    fetch("../../data/productos.json")
        .then(resp => resp.json())
        .then(data => {
             data.forEach(prod => {
                containerCard.innerHTML += card(prod)                
            })
            eventosCard(data);                
        })
        .catch(error => {
            console.log(error);
        })
})

