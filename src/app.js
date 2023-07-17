import express from "express"
import {Server} from "socket.io"
import viewsRouter from "./routes/views.router.js"
import handlebars from "express-handlebars"
import { __dirname } from "./utils.js"
import productRouter from "./routes/products.router.js"
import cartRouter from "./routes/carts.router.js"
import { ProductManager } from "./manager/ProductManager.js"

const miProducto = new ProductManager("productos.json")
const app = express()
const port = 8080
const httpServer = app.listen(port,()=>{
    console.log(`Servidor corriendo en puerto ${port}`);
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))
app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter)
app.use("/",viewsRouter)

//HANDLEBARS CONFIG

app.engine("handlebars", handlebars.engine())

app.set("views", __dirname +"/views" )

app.set("view engine", "handlebars")

//---
const socketServer = new Server(httpServer)

socketServer.on("connection", async (socket) =>{
    console.log("nueva conexion");
    const productos = await miProducto.getProducts()
    socket.emit("lista_productos",productos)
})

