import mongoose from "mongoose";
const {Schema, model, models} = mongoose;

const ProductoSchema = new Schema ({
    categoria: {type: String, required: true},
    nombre: {type: String, required: true},
    descripcion: {type: String, required: true},
    precio: {type: Number, required: true},
    imagen: {type: String, required: true}
})

const Producto = models.producto || model('producto', ProductoSchema);