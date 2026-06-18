# Proyecto AW2
Trabajo práctico integrador de la materia Aplicaciones Web 2

## DESCRIPCION DEL SISTEMA
El sistema simula un e-commerce de productos de tecnología (notebooks, celulares y accesorios).
Permite:
- Registro de usuarios.
- Inicio de sesión con autenticación JWT.
- Visualización de productos por categoría.
- Gestión de carrito de compras.
- Creación de ventas asociadas al usuario logueado.
- Visualización de compras realizadas por cada usuario.

## SOLICITUDES HTTP
### /users
- **GET:** localhost:3000/users/all - Traer todos los usuarios
- **POST:** localhost:3000/users/registro - Crear un nuevo usuario
- **POST:** localhost:3000/users/login - Inicia sesion de usuario
- **PUT:** localhost:3000/users/:id - Modificar un usuario por su id
- **DELETE:** localhost:3000/users/:id - Eliminar un usuario por su id

### /productos
- **GET:** localhost:3000/productos/all - Traer todos los productos
- **GET:** localhost:3000/productos/category/:category - Traer los productos segun su categoria
- **POST:** localhost:3000/productos - Crear un nuevo producto
- **PUT:** localhost:3000/productos/:id - Modificar un producto por su id
- **DELETE:** localhost:3000/productos/:id - Eliminar un producto por su id

### /ventas
- **GET:** localhost:3000/ventas/all - Traer todas las ventas
- **GET:** localhost:3000/ventas/misCompras - Traer todas las compras hechas por el usuario logueado
- **POST:** localhost:3000/ventas - Crear una nueva venta
- **PUT:** localhost:3000/ventas/:id - Modificar una venta por su id
- **DELETE:** localhost:3000/ventas/:id - Eliminar una venta por su id

## TECNOLOGIAS UTILIZADAS
### BACKEND:
- NodeJs: entorno de ejecución de Javascript en servidor
- ExpressJs: framework utilizado para la creación del servidor y manejo de rutas HTTP
- JSON: archivos locales utilizados como fuentes de datos para almacenar usuarios, productos y ventas
- fs/promises: módulo nativo de Node.js para lectura y escritura de archivos JSON
- dotenv: para las variables de entorno

### SEGURIDAD Y AUTENTICACION
- jsonwebtoken (JWT): utilizado para la generación y validación de tokens de autenticación
- bcrypt: utilizado para el cifrado de contraseñas de usuarios, asegurando la protección de datos sensibles
- dotenv: manejo de variables de entorno como la clave secreta del JWT

### FRONTEND
- HTML: estructura de las páginas.
- CSS: estilos visuales de la aplicación.
- Javascript: lógica del frontend, consumo de API y manipulación del DOM.
- Fetch API: comunicación entre frontend y backend

## MEJORAS IMPLEMENTADAS
- Autenticación y seguridad con JWT y bcrypt
- Control de usuarios

A futuro:
- Migrar la fuente de datos, desde JSON a MongoDB
- Crear un usuario administrador, que pueda modificar datos
- Ver detalles de cada compra realizada
- Mejorar la interfaz

## LINK VIDEO:
https://drive.google.com/drive/folders/1vGTMD0zMFYnx17kaE7jgHkd7CZyHeYjL?usp=sharing
