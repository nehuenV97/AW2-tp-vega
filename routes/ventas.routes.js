import { Router } from 'express';
import { readFile, writeFile } from 'fs/promises';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = Router();

const fileVentas = await readFile('./data/ventas.json', 'utf-8');
const ventaData = JSON.parse(fileVentas);

const fileProductos = await readFile('./data/productos.json', 'utf-8');
const productoData = JSON.parse(fileProductos);

// Trae todos las ventas
router.get('/all', (req, res) => {
    try {
        res.status(200).json(ventaData);
    } catch (error) {
        res.status(500).json('Error al buscar...')
    }
})

// Ventas por periodos
// router.post('/detalle', (req, res) => {
//     const from = req.body.from;
//     const to = req.body.to;

//     let auxName = '';
//     try {
//         const arr = ventaData.filter(e => e.fecha >= from && e.fecha <= to);

//         const result = arr.map( e => {
//             auxName = getUserById(e.id_usuario);
//             auxName = auxName.nombre + ' ' + auxName.apellido;
//             return {
//                 id: e.id,
//                 fecha: e.fecha,
//                 cliente: auxName,
//                 total: e.total,
//             }
//         })
        
//         if (result) {
//             res.status(200).json(result);
//         } else {
//             res.status(400).json(`No hay ventas entre ${from} y ${to}`);        
//         }

//     } catch (error) {
//         res.status(500).json('Error al buscar...')
//     }
// })

// Crear una nueva venta
// router.post('/', (req, res) => {
//   try {
//     const newVenta = req.body;
     
//     if (!newVenta.id_usuario) {
//       return res.status(400).json({ error: "Falta el campo 'id_usuario'" });
//     }
//     if (!newVenta.fecha) {
//       return res.status(400).json({ error: "Falta el campo 'fecha'" }); 
//     }
//     if (!newVenta.direccion) {
//       return res.status(400).json({ error: "Falta el campo 'direccion'" });
//     }
//     if (!newVenta.productos) {
//       return res.status(400).json({ error: "Faltan especificar 'productos'" }); 
//     }

//     // TODO: Mejorar el manejo del total de la venta (sumando los productos seleccionados)
//     newVenta.id = ventaData.length > 0 ? ventaData.at(-1).id + 1 : 1; 
//     const nuevo = {
//         id: newVenta.id,
//         ...req.body,
//     };  

//     ventaData.push(nuevo);    
//     writeFile('./data/ventas.json', JSON.stringify(ventaData, null, 4));    
//     res.status(201).json(newVenta);

//   } catch (error) {
//     res.status(500).json({ error: 'Error al guardar la venta.' });
//   }
// })

router.post('/', verifyToken, (req, res) => {
  try {
    const { direccion, productos } = req.body;

    if (!productos || productos.length === 0) {
        return res.status(400).json({error: 'No hay productos'});
    }

    let total = 0;
    const detalleProductos = productos.map(item => {
      const producto = productoData.find(p => p.id === item.id_producto);

      if (!producto) {
        throw new Error(`Producto ${item.id_producto} inexistente`);
      }

      total += producto.precio * item.cantidad;

      return {
        id_producto: producto.id,
        cantidad: item.cantidad,
        precio_unitario: producto.precio
      };
    });

    const nuevaVenta = {
      id: ventaData.length > 0 ? Math.max(...ventaData.map(v => v.id)) + 1: 1,
      id_usuario: req.usuario.id,
      fecha: new Date().toISOString().split('T')[0],
      total,
      direccion,
      entregado: false,
      productos: detalleProductos
    };

    ventaData.push(nuevaVenta);
    writeFile('./data/ventas.json', JSON.stringify(ventaData,null,4));
    res.status(201).json(nuevaVenta);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
  }
);

//ventas de un cliente
router.get('/misCompras', verifyToken, (req, res) => {
    try {  
      const misVentas = ventaData.filter( v => v.id_usuario === req.usuario.id);
      res.status(200).json(misVentas);
    } catch (error) {
        res.status(500).json({error: 'Error al obtener compras'});
    }
});

// Actualizar un cliente por su ID
router.put('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "El ID debe ser un número válido" });
    }

    const index = ventaData.findIndex(c => c.id === id);    
    if (index === -1) {
      return res.status(404).json({ error: `Venta con ID ${id} no encontrado` });
    }
    
    const nuevosDatos = req.body;    
    
    // TODO: Revisar validaciones
    if (nuevosDatos.id && nuevosDatos.id !== id) {
      return res.status(400).json({ error: "No está permitido cambiar el ID de la venta" });
    }    
    // if (nuevosDatos.id_usuario) {
    //   return res.status(400).json({ error: "No está permitido cambiar el usuario" });
    // } 
    // if (nuevosDatos.password) {
    //   return res.status(400).json({ error: "No está permitido cambiar la contraseña del usuario" });
    // }     
    // if (nuevosDatos.direccion && nuevosDatos.direccion.trim() === '') {
    //   return res.status(400).json({ error: "La direccion no puede estar vacía" });
    // }    
    // if (nuevosDatos.productos && nuevosDatos.productos.trim() === '') {
    //   return res.status(400).json({ error: "Los productos no pueden estar vacíos" });
    // }    

    const ventaActualizada = { ...ventaData[index], ...nuevosDatos };    
    
    ventaData[index] = ventaActualizada;  
    
    writeFile('./data/ventas.json', JSON.stringify(ventaData, null, 4));
    
    res.status(200).json({
      mensaje: "Venta actualizada exitosamente",
      venta: ventaActualizada 
    });
    
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la venta.' });
  }
});

// Eliminar una venta por su ID
router.delete('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = ventaData.findIndex(c => c.id === id);

    if (index !== -1) {
      const eliminado = ventaData.splice(index, 1);
      writeFile('./data/ventas.json', JSON.stringify(ventaData, null, 4));      
      
      res.json({
        mensaje: `Venta eliminada exitosamente`,
        ventaEliminada: eliminado[0]});
    } else {
      res.status(404).json({ mensaje: "Venta no encontrada" });
    }

  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la venta' });
  }
});  

export default router;