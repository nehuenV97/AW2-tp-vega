import { nuevaVenta } from "../../ventas/ventas.js";

document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".carrito");
    const btnVaciar = document.getElementById("vaciar-carrito");
    const btnComprar = document.getElementById("finalizar-compra");
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
        container.innerHTML = `<div class="carrito-item"><h2>El carrito está vacío.</h2></div>`;
        return;
    }

    carrito.forEach(item => {
        const cardItem = document.createElement("div");
        cardItem.classList.add("carrito-item");

        cardItem.innerHTML = `
                <h3>${item.nombre}</h3>            
                <div class="info">
                    <h4>Precio: $${item.precio}</h4>
                    <h4>Cantidad: ${item.cantidad}</h4>
                    <h4>Subtotal: $${item.precio * item.cantidad}</h4>
                    <button class="btn-borrar"><i class="bi bi-trash icono-white"></i></button>
                </div>
               
        `;       

        // eliminar producto del carrito
        cardItem.querySelector(".btn-borrar").addEventListener("click", () => {
            eliminarDelCarrito(item.id);
        });

        container.appendChild(cardItem);
    });

    btnVaciar.addEventListener("click", () => vaciarCarrito());
    btnComprar.addEventListener("click", () => finalizarCompra());
    actualizarTotal();
});

const eliminarDelCarrito = (id) => {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito = carrito.filter(item => item.id !== id);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    location.reload();
}

const actualizarTotal = () => {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    document.querySelector("#total").textContent = total;
};

const vaciarCarrito = () => {
    Swal.fire({
        title: "¿Estás seguro?",
        icon: "question",
        text: "Se van a borrar todos los productos del carrito",
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: `Si`,        
        cancelButtonText: `No`,        
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("carrito");
            location.reload();
        }
    })    
} 

const finalizarCompra = async () => {
    const usuario = JSON.parse(sessionStorage.getItem("usuario"));
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (!usuario) {
        Swal.fire({
            icon: "warning",
            title: "Debe iniciar sesión"
        });
        window.location.href = "../pages/login.html";
        return;
    }

    if (carrito.length === 0) {
        Swal.fire({
            icon: "warning",
            title: "El carrito está vacío"
        });
        return;
    }

    Swal.fire({
        title: "¿Estás seguro?",
        icon: "question",
        text: "Se realizará la compra de los productos del carrito",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "No"
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const venta = {
                    direccion: "Retira en sucursal",
                    productos:
                        carrito.map(item => ({
                            id_producto: item.id,
                            cantidad: item.cantidad
                        }))
                };

                await nuevaVenta(venta);

                Swal.fire({
                    title: "¡Compra realizada con éxito!",
                    icon: "success",
                    text: `${usuario.nombre} ${usuario.apellido} realizaste una compra a retirar por sucursal`
                }).then(() => {
                    localStorage.removeItem("carrito");

                    location.reload();
                });
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: error.message
                });
            }
        }
    });
}

// btnFinalizar.addEventListener('click', async () => {
//         try {
//             const carrito = JSON.parse(localStorage.getItem('carrito'));

//             const venta = {
//                 direccion: document.getElementById('direccion').value,
//                 productos:
//                     carrito.map(p => ({
//                         id_producto: p.id,
//                         cantidad: p.cantidad
//                     }))
//             };

//             const resultado = await createVenta(venta);

//             Swal.fire({
//                 icon: 'success',
//                 title: 'Compra realizada'
//             });

//             localStorage.removeItem('carrito');

//             location.href = '../../index.html';
//         } catch (error) {
//             Swal.fire({
//                 icon: 'error',
//                 title: error.message
//             });
//         }
//     }
// );