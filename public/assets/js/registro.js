const registroForm = document.getElementById("registroForm");

if (registroForm) {
    registroForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        //Validación
        const nombre = document.getElementById("nombre").value.trim();
        const apellido = document.getElementById("apellido").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const fecha = document.getElementById("date").value.trim();

        if (!nombre || !apellido || !email || !password || !fecha) {
            Swal.fire({
                title: "Por favor complete todos los campos",
                icon: "warning"  
            })
            return;
        }

        // Obtenemos usuarios guardados o un array vacío
        const usuarios = JSON.parse(sessionStorage.getItem("usuarios")) || [];

        // Verificar si ya existe
        const existe = usuarios.find(u => u.email === email);
        if (existe) {
            Swal.fire({
                title: "¡No se pudo registrar!",
                text: "Ya existe un usuario con ese email",
                icon: "error"
            });            
            return;
        }

        // Guarda el nuevo usuario
        usuarios.push({ nombre, apellido, email, password, fecha });
        sessionStorage.setItem("usuarios", JSON.stringify(usuarios));

        Swal.fire({
            title: "¡Registro exitoso!",
            text: "Ya puede iniciar sesión",
            icon: "success"
        }).then(() => {
            window.location.href = "./login.html";
        })        
        
    });
}