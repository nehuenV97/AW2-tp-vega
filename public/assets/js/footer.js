const footerComponente = () => {
    const footer = document.querySelector("footer")
    
    footer.innerHTML += `
        <p>&copy; 2025 MorsaTech - Todos los derechos reservados.</p>
    `
}

document.addEventListener("DOMContentLoaded", footerComponente())