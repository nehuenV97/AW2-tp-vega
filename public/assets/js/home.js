import { card, eventosCard} from "./card.js";
import { getProducts } from "../../productos/productos.js";

let containerCard = document.querySelector(".container");

document.addEventListener("DOMContentLoaded", async() => {
    if (!containerCard) return;

    const productos = await getProducts();

    productos.forEach(prod => {
        containerCard.innerHTML += card(prod)                
    })
    eventosCard(productos);   
})

