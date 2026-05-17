cerrarSesion = () => {
    sessionStorage.removeItem("usuario");
    window.location.href = "../../pages/login.html";
}