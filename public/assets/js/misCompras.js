import { getMisCompras } from "../../ventas/ventas.js";

document.addEventListener("DOMContentLoaded", async () => {
    const container = document.querySelector(".compras-container");
    try {
        const compras = await getMisCompras();

        if (compras.length === 0) {
            container.innerHTML = "<h3>No tenés compras todavía</h3>";
            return;
        }
        compras.forEach(venta => {
            const div = document.createElement("div");
            div.classList.add("compra");
            div.innerHTML = `
                <h3>Id #${venta.id}</h3>
                <p>Fecha: ${venta.fecha}</p>
                <p>Total: $${venta.total}</p>
                <p>Productos: ${venta.productos.length}</p>
            `;
            container.appendChild(div);
        });
    } catch (error) {
        container.innerHTML =
            `<p>Error al cargar compras</p>`;
    }
});