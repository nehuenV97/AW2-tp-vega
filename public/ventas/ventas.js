export const getVentas = async() => {
    try {
        const response = await fetch('http://localhost:3000/ventas/all', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            }
        })

        if (!response.ok){
            throw new Error(`Error: ${response.status}`);
        }

        const ventas = await response.json();
        return ventas;
    } catch (error) {
        console.error('Error al traer ventas: ', error);
    }
}

export const nuevaVenta = async (venta) => {
    const token = sessionStorage.getItem('token');

    const response = await fetch('http://localhost:3000/ventas',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(venta)
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error);
    }

    return data;
};

export const getMisCompras = async () => {
    const token = sessionStorage.getItem('token');
    const response = await fetch('http://localhost:3000/ventas/misCompras',
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    );
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error);
    }

    return data;
};