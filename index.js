import express from 'express';
import productoRouter from "./routes/productos.routes.js";
import userRouter from "./routes/usuarios.routes.js";
import ventaRouter from "./routes/ventas.routes.js";

const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
    console.log(`Servidor levantado en el puerto ${port}`);    
})

app.get('/', (req, res) => {
    res.send('¡Hola mundo!');
})

app.use('/productos', productoRouter);
app.use('/users', userRouter);
app.use('/ventas', ventaRouter);

