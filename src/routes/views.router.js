import { Router } from "express";
import { ProductManager } from "../manager/ProductManager.js";

const miProducto = new ProductManager("productos.json")
const router = Router()

router.get("/",async (req,res)=>{
    const productos = await miProducto.getProducts()
    console.log(productos);
    res.render("home",{productos,style:"style.css",title:"PRODUCTOS"})
})

router.get("/realtimeproducts",async (req,res)=>{
    res.render("realTimeProducts",{style:"style.css",title:"PRODUCTOS-REAL-TIME"})
})


export default router