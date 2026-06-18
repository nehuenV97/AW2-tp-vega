export const auth = async(email, password) => {
    const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({email, password})
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.mensaje);
    }

    sessionStorage.setItem('token', data.token);

    sessionStorage.setItem('usuario', JSON.stringify(data.usuario));

    return data;
}

export const isLogged = () => {
    const token = sessionStorage.getItem('token');
    return !!token;
}

export const newRegister = async(nombre, apellido, email, password) => {
    const user = await fetch('http://localhost:3000/users/registro', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({nombre, apellido, email, password})
    })
    
    const data = await user.json();

    if (!user.ok) {
        throw new Error(data.mensaje);
    }
    return data;    
}