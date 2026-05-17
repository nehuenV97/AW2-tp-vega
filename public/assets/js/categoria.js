import { card, eventosCard} from "./card.js";

document.addEventListener("DOMContentLoaded", () => {

    const container = document.querySelector(".container");
    if (!container) return;

    //Detectar categoría según el archivo actual
    const filename = window.location.pathname.split("/").pop();
    const categoria = filename.replace(".html", "");

    fetch("../../data/productos.json")
        .then(resp => resp.json())
        .then(data => {

            const productosFiltrados = data.filter(prod => prod.categoria === categoria);

            if (productosFiltrados.length === 0) {
                container.innerHTML = `<p>No hay productos en esta categoría.</p>`;
                return;
            }

            productosFiltrados.forEach((prod, index) => {
                container.innerHTML += card(prod, index);
            });           
            
            eventosCard(productosFiltrados);
        })
        .catch(error => console.log(error));
});
