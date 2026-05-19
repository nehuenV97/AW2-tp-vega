export const auth = async({email, password}) => {
    const user = await fetch('http://localhost:3000/users/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
    }).then( res => {
        if (!res.ok) {
            throw new Error("Error en la petición");
        }
        return res.json();
    }).catch( error => {
        console.error("Error: ", error);
        throw new Error("Error en la petición");        
    })
    console.log(user);
    
    return user;
}