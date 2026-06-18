import { Router } from 'express';
import { readFile, writeFile } from 'fs/promises';

const router = Router();

const fileProductos = await readFile('./data/productos.json', 'utf-8');
const productoData = JSON.parse(fileProductos);

const fileVentas = await readFile('./data/ventas.json', 'utf-8');
const ventaData = JSON.parse(fileVentas);

// Trae todos los productos
router.get('/all', (req, res) => {
    try {
        res.status(200).json(productoData);
    } catch (error) {
        res.status(500).json('Error al buscar...')
    }
})

// Traer productos por categoria
router.get('/category/:category', (req, res) => {
  try {
    const category = req.params.category;
    const prodFiltrados = productoData.filter( e => e.categoria === category)

    res.status(200).json(prodFiltrados);
  } catch (error) {
    res.status(500).json('Error al buscar...')
  }
})

// Crear un nuevo producto
router.post('/', (req, res) => {
  try {
    const newProducto = req.body;
    // Validación 
    if (!newProducto.nombre) {
      return res.status(400).json({ error: "Falta el campo 'nombre'" });
    }
    if (!newProducto.categoria) {
      return res.status(400).json({ error: "Falta el campo 'categoria'" }); 
    }
    if (!newProducto.descripcion) {
      return res.status(400).json({ error: "Falta el campo 'descripcion'" });
    }
    if (!newProducto.precio) {
      return res.status(400).json({ error: "Falta el campo 'precio'" }); 
    }
    
    newProducto.id = productoData.length > 0 ? productoData.at(-1).id + 1 : 1; 
    const nuevo = {
        id: newProducto.id,
        ...req.body,
    };  

    productoData.push(nuevo);    
    writeFile('./data/productos.json', JSON.stringify(productoData, null, 4));    
    res.status(201).json(newProducto);

  } catch (error) {
    res.status(500).json({ error: 'Error al guardar el producto.' });
  }
})

// Actualizar un producto por su ID
router.put('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "El ID debe ser un número válido" });
    }

    const index = productoData.findIndex(c => c.id === id);    
    if (index === -1) {
      return res.status(404).json({ error: `Producto con ID ${id} no encontrado` });
    }
    
    const nuevosDatos = req.body;    
   
    if (nuevosDatos.id && nuevosDatos.id !== id) {
      return res.status(400).json({ error: "No está permitido cambiar el ID del producto" });
    }
    if (nuevosDatos.categoria && nuevosDatos.categoria.trim() === '') {
      return res.status(400).json({ error: "La categoria no puede estar vacía" });
    }        
    if (nuevosDatos.nombre && nuevosDatos.nombre.trim() === '') {
      return res.status(400).json({ error: "El nombre no puede estar vacío" });
    }    
    if (nuevosDatos.descripcion && nuevosDatos.descripcion.trim() === '') {
      return res.status(400).json({ error: "La descripcion no puede estar vacía" });
    }       

    const productoActualizado = { ...productoData[index], ...nuevosDatos };    
    
    productoData[index] = productoActualizado;  
    
    writeFile('./data/productos.json', JSON.stringify(productoData, null, 4));
    
    res.status(200).json({
      mensaje: "Producto actualizado exitosamente",
      producto: productoActualizado 
    });
    
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto.' });
  }
});

// Eliminar un producto por su ID
router.delete('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = productoData.findIndex(c => c.id === id);

    if (index !== -1) {
      
      const tieneVentas = ventaData.some(v =>
        v.productos.some(p => p.id_producto === id)
      );      

      if (tieneVentas) {
        return res.status(400).json({
          error: "No se puede eliminar el producto porque tiene ventas asociadas"
        });
      }

      const eliminado = productoData.splice(index, 1);
      writeFile('./data/productos.json', JSON.stringify(productoData, null, 4));      
      
      res.json({
        mensaje: `Producto eliminado exitosamente`,
        productoEliminado: eliminado[0]});
    } else {
      res.status(404).json({ mensaje: "Producto no encontrado" });
    }

  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
});  

export default router;