import { newRegister } from '../../auth/auth.js';

// const fileUsers = await readFile('../../../data/usuarios.json', 'utf-8');
// const userData = JSON.parse(fileUsers);

const registroForm = document.getElementById("registroForm");

if (registroForm) {
    registroForm.addEventListener("submit", async(e) => {
        e.preventDefault();
        
        //Validación
        const nombre = document.getElementById("nombre").value.trim();
        const apellido = document.getElementById("apellido").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (nombre !== '' && apellido !== '' && email !== '' && password !== '') {
            try {                
                const usuario = await newRegister(nombre, apellido, email, password);
                
                Swal.fire({
                    title: "¡Registro exitoso!",
                    text: "Ya puede iniciar sesión",
                    icon: "success"
                }).then(() => {
                    window.location.href = "./login.html";
                })  

            } catch (error) {
                Swal.fire({
                title: "¡No se pudo registrar usuario!",
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
}