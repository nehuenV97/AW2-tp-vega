import { Router } from 'express';
import { readFile, writeFile } from 'fs/promises';

const router = Router();

const fileUsers = await readFile('./data/usuarios.json', 'utf-8');
const userData = JSON.parse(fileUsers);

const fileVentas = await readFile('./data/ventas.json', 'utf-8');
const ventaData = JSON.parse(fileVentas);

// Trae todos los usuarios
router.get('/all', (req, res) => {
    try {
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json('Error al buscar...')
    }
})

// Crear un nuevo usuario 
router.post('/', (req, res) => {
  try {
    const newUser = req.body;
    // Validación 
    if (!newUser.nombre) {
      return res.status(400).json({ error: "Falta el campo 'nombre'" });
    }
    if (!newUser.apellido) {
      return res.status(400).json({ error: "Falta el campo 'apellido'" }); 
    }
    if (!newUser.email) {
      return res.status(400).json({ error: "Falta el campo 'email'" });
    }
    if (!newUser.password) {
      return res.status(400).json({ error: "Falta el campo 'password'" }); 
    }

    // Asignamos un nuevo ID secuencial
    newUser.id = userData.length > 0 ? userData.at(-1).id + 1 : 1; 
    const nuevo = {
        id: newUser.id,
        ...req.body,
        activo: true
    };  

    userData.push(nuevo);    
    writeFile('./data/usuarios.json', JSON.stringify(userData, null, 4));    
    res.status(201).json(newUser);

  } catch (error) {
    res.status(500).json({ error: 'Error al guardar el usuario.' });
  }
})

//login
router.post('/login', (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
  
    const result = userData.find(e => e.email === email && e.password === password);
  
    if (result) {
      const data = {
        nombre: result.nombre,
        apellido: result.apellido,
        email: result.email,
        password: result.password,
        status: true
      }
      res.status(200).json(data);
    } else {
      res.status(400).json({ status: false });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al loguear el usuario.' });
  }
})

// Actualizar un cliente por su ID
router.put('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "El ID debe ser un número válido" });
    }

    const index = userData.findIndex(c => c.id === id);    
    if (index === -1) {
      return res.status(404).json({ error: `Usuario con ID ${id} no encontrado` });
    }
    
    const nuevosDatos = req.body;    
    
    // TODO: Revisar validaciones
    if (nuevosDatos.id && nuevosDatos.id !== id) {
      return res.status(400).json({ error: "No está permitido cambiar el ID del usuario" });
    }    
    if (nuevosDatos.email) {
      return res.status(400).json({ error: "No está permitido cambiar el email del usuario" });
    } 
    if (nuevosDatos.password) {
      return res.status(400).json({ error: "No está permitido cambiar la contraseña del usuario" });
    }     
    if (nuevosDatos.nombre && nuevosDatos.nombre.trim() === '') {
      return res.status(400).json({ error: "El nombre no puede estar vacío" });
    }    
    if (nuevosDatos.apellido && nuevosDatos.apellido.trim() === '') {
      return res.status(400).json({ error: "El apellido no puede estar vacío" });
    }    

    const userActualizado = { ...userData[index], ...nuevosDatos };    
    
    userData[index] = userActualizado;  
    
    writeFile('./data/usuarios.json', JSON.stringify(userData, null, 2));
    
    res.status(200).json({
      mensaje: "Cliente actualizado exitosamente",
      usuario: userActualizado 
    });
    
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario.' });
  }
});

// Eliminar un usuario por su ID
router.delete('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = userData.findIndex(c => c.id === id);

    if (index !== -1) {      
      const tieneVentas = ventaData.some(v => v.id_usuario === id);

      if (tieneVentas) {
        return res.status(400).json({
          error: "No se puede eliminar el usuario porque tiene ventas asociadas"
        });
      }

      const eliminado = userData.splice(index, 1);
      writeFile('./data/usuarios.json', JSON.stringify(userData, null, 2));      
      
      res.json({
        mensaje: `Usuario eliminado exitosamente`,
        usuarioEliminado: eliminado[0]});
    } else {
      res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
});  

export default router;