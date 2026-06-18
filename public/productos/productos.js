export const getProducts = async() => {
    try {
        const response = await fetch('http://localhost:3000/productos/all', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            }
        })

        if (!response.ok){
            throw new Error(`Error: ${response.status}`);
        }

        const productos = await response.json();
        return productos;
    } catch (error) {
        console.error('Error al traer productos: ', error);
    }
}

export const getProductsByCategory = async(category) => {
    try {
        const response = await fetch(`http://localhost:3000/productos/category/${category}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            }
        })

        if (!response.ok){
            throw new Error(`Error: ${response.status}`);
        }

        const productos = await response.json();
        return productos;
    } catch (error) {
        console.error('Error al traer productos: ', error);
    }
}