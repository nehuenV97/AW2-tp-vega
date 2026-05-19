import { auth } from '../../auth/auth.js';

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async(e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    
    if (!email || !password) {
        Swal.fire({
            title: "Por favor complete todos los campos",
            icon: "warning"  
        })
        return;
    }

    // const usuarios = JSON.parse(sessionStorage.getItem("usuarios")) || [];
    // const usuario = usuarios.find(u => u.email === email && u.password === password);

    const usuario = await auth({email, password});

    if (usuario) {
        sessionStorage.setItem("usuario", JSON.stringify(usuario));
        window.location.href = "../../index.html";
    } else {
        Swal.fire({
            title: "¡Usuario no registrado!",
            icon: "warning"  
        })        
    }
});