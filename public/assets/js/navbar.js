const pages = [
    { title: "Home", url: "../index.html" },
    { title: "Notebooks", url: "../pages/notebooks.html" },
    { title: "Celulares", url: "../pages/celulares.html" },
    { title: "Accesorios", url: "../pages/accesorios.html" }
];

const pagesLog = [
    { title: "Registro", url: "../pages/registro.html"},
    { title: "Login", url: "../pages/login.html"}
]

crearNavbar = () => {
    const navbar = document.querySelector(".navbar");
    const usuario = JSON.parse(sessionStorage.getItem("usuario"));

    navbar.innerHTML += `    
        <div class="logo">
        <img src="../assets/img/mt-navbar.svg" alt="morsa-tech">
        </div>
        <div class="container-menu">
            <button class="btn-menu">
                <i class="bi bi-list icono"></i>
            </button>
        </div>
        <ul class="nav-links"></ul>
        <div class="nav-buttons"></div>    
    `;
    
    const navLinks = navbar.querySelector(".nav-links");
    pages.forEach(page => {
        navLinks.innerHTML += `<li><a href='${page.url}'>${page.title}</a></li>`;
    }); 
    
    const navButtons = navbar.querySelector(".nav-buttons");  
    usuario ?
        navButtons.innerHTML += `
            <p class="userName">
                <i class="bi bi-person-circle icono"></i> ${usuario.apellido}, ${usuario.nombre}
            </p>
            <a href="../pages/carrito.html">
                <button class="nav-btn">
                    <i class="bi bi-cart icono"></i>
                </button>
            </a>
            <a href="#" onclick="cerrarSesion()">
                <button class="nav-btn btn-logout">
                    <i class="bi bi-box-arrow-right icono-white"></i>
                </button>
            </a>
        `
        :
        pagesLog.forEach(pLog => {
        navButtons.innerHTML += `
            <a href="${pLog.url}">
            <button class="nav-btn">
                ${pLog.title}
            </button>
            </a>
        `
        })   
}

document.addEventListener("DOMContentLoaded", crearNavbar);


crearHamburger = () => {
    const hamburger = document.querySelector(".hamburger");
    const btnMenu = document.querySelector(".btn-menu");
    const usuario = JSON.parse(sessionStorage.getItem("usuario"));

    hamburger.innerHTML += `        
        <div class="nav-buttons"></div>  
        <ul class="nav-links"></ul>
    `;
    
    const navLinks = hamburger.querySelector(".nav-links");
    pages.forEach(page => {
        navLinks.innerHTML += `<li><a href='${page.url}'>${page.title}</a></li>`;
    }); 
    
    const navButtons = hamburger.querySelector(".nav-buttons");  
    usuario ?
        navButtons.innerHTML += `
            <p class="userName">
                <i class="bi bi-person-circle icono"></i> ${usuario.apellido}, ${usuario.nombre}
            </p>
            <a href="../pages/carrito.html">
                <button class="nav-btn">
                    <i class="bi bi-cart icono"></i>
                </button>
            </a>
            <a href="#" onclick="cerrarSesion()">
                <button class="nav-btn btn-logout">
                    <i class="bi bi-box-arrow-right icono-white"></i>
                </button>
            </a>
        `
        :
        pagesLog.forEach(pLog => {
        navButtons.innerHTML += `
            <a href="${pLog.url}">
            <button class="nav-btn">
                ${pLog.title}
            </button>
            </a>
        `
        })

    btnMenu.addEventListener("click", () => {
        navButtons.classList.toggle("active");
        navLinks.classList.toggle("active");
    });
}

document.addEventListener("DOMContentLoaded", crearHamburger);