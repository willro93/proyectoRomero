import ProductManager from "./productManager.js";
import express from "express"
import { dirname } from 'path';
import { fileURLToPath } from 'url';

//declarar funcionalidades de express y el puerto a utilizar
const app=express()
const PORT=8080
//Middleware para poder usar los req.query
app.use(express.urlencoded({ extended: true }));

//configurando los endpoints
app.get("/products",async(req, res)=>{
    const {limit} = req.query
    const products=await productManager.getProducts()
    if(limit){
        const nuevoLimite=products.splice(0,limit)
        res.json(nuevoLimite)
    } else {
        res.json(products)
    }
})


app.get("/products/:pid", async(req, res)=>{
    const{pid}=req.params
    const products=await productManager.getProducts()
    const productid=products.find(element=>element.id===parseInt(pid))
    if(productid){
        res.json (productid)
    } else {
        res.send({message:"usuario no encontrado"})
    }
})





const __dirname =dirname(fileURLToPath(import.meta.url));
const productManager = new ProductManager(__dirname + "./files/productos.json");
//await productManager.addProduct(
//    "shampoo sólido",
//    "El mejor shampoo",
//    "$150.00",
//    "img1",
//    "shamp1",
//    "500 unidades"
//  );
//  await productManager.addProduct(
//    "Acondicionador sólido",
//    "Para cabello seco",
//    "$140.00",
//    "img2",
//    "aco1",
//    "700 unidades"
//  );
//  await productManager.addProduct(
//    "shampoo sólido",
//    "El mejor shampoo 2",
//    "$150.00",
//    "img3",
//    "shamp1",
//    "500 unidades"
//  );
//  await productManager.addProduct(
//      "Acondicionador sólido",
//      "Para cabello seco",
//      "$140.00",
//      "img4",
//      "aco1",
//      "700 unidades"
//    );
//console.log(await productManager.getProducts());
//console.log(await productManager.getProductById(2));
//await productManager.updateProducts(
//  1,
//  "Nuevo título",
//  "Nueva descripción",
//  "$700.00",
//  "img56",
//  "Shamp5",
//  "2000 unidades"
//);
//await productManager.deleteProduct(1);


//Puerto donde se escucha
app.listen(PORT, () => {
    console.log(`Puerto ${PORT} levantado`);
})