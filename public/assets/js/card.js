export const card = (data) => {
    return `
        <div class="card" data-id="${data.id}">
            <img src="${data.imagen}" alt="${data.nombre}">                
            <h3>${data.nombre}</h3>
            <p>${data.descripcion}</p>
            <h3>$${data.precio}</h3>

            <div class="cantidad-container">
                <button class="restar" >-</button>
                <p class="cantidad">1</p>
                <button class="sumar">+</button>
            </div>

            <button class="agregar-carrito">Agregar al carrito</button>
        </div> 
    `
}

export const eventosCard = (productos) => {    
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const id = Number(card.dataset.id);
        const producto = productos.find(p => p.id === id);

        const btnSumar = card.querySelector(".sumar");
        const btnRestar = card.querySelector(".restar");
        const cantidadElemento = card.querySelector(".cantidad");
        const btnAgregar = card.querySelector(".agregar-carrito");

        let cantidad = 1;

        btnSumar.addEventListener("click", () => {
            cantidad++;
            cantidadElemento.textContent = cantidad;
        });

        btnRestar.addEventListener("click", () => {
            if (cantidad > 1) {
                cantidad--;
                cantidadElemento.textContent = cantidad;
            }
        });

        // AGREGAR AL CARRITO
        btnAgregar.addEventListener("click", () => {
            const usuario = sessionStorage.getItem("usuario")

            if (!usuario) {
                Swal.fire({
                    title: "Inicia sesión para agregar productos al carrito",
                    icon: "warning"  
                }).then(() => {
                    location.href = "../../pages/login.html";                    
                })               
                return;
            }

            agregarAlCarrito(producto, cantidad);
            Swal.fire({              
                icon: "success",
                title: "¡Producto agregado al carrito!",
                showConfirmButton: false,
                timer: 800,
                position: "top-end"
            });            
        });
    });
};

export const agregarAlCarrito = (producto, cantidad) => {

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const existe = carrito.find(item => item.id === producto.id);

    if (existe) {        
        existe.cantidad += cantidad;
    } else {        
        carrito.push({
            id: producto.id,
            categoria: producto.categoria,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: cantidad
        });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
}