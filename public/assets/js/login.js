import { auth } from '../../auth/auth.js';

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async(e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    
    if (email !== '' && password !== '') {
        try {
            const usuario = await auth(email, password);            
            window.location.href = "../../index.html";
        } catch (error) {
            Swal.fire({
            title: "¡Usuario no registrado!",
            icon: "warning"
            })
        }
    } else {
        Swal.fire({
            title: "Por favor complete todos los campos",
            icon: "warning"  
        })
    }    
});