import { card, eventosCard} from "./card.js";
import { getProductsByCategory } from "../../productos/productos.js";

document.addEventListener("DOMContentLoaded", async() => {

    const container = document.querySelector(".container");
    if (!container) return;

    //Detectar categoría según el archivo actual
    const filename = window.location.pathname.split("/").pop();
    const categoria = filename.replace(".html", "");

    const prodFiltrados = await getProductsByCategory(categoria);

    if (prodFiltrados.length === 0) {
        container.innerHTML = `<p>No hay productos en esta categoría.</p>`;
        return;
    }

    prodFiltrados.forEach((prod, index) => {
        container.innerHTML += card(prod, index);
    });           
            
    eventosCard(prodFiltrados);    
});
