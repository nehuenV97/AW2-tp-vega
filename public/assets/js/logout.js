cerrarSesion = () => {
    sessionStorage.removeItem("usuario");
    sessionStorage.removeItem("token");
    window.location.href = "../../pages/login.html";
}