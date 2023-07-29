import { Router } from "express";
import ProductManager from "../productManager.js";
import { __dirname } from "../utils.js";

//Utilizando la clase importada
const productManager = new ProductManager(__dirname + "./files/productos.json");
const router = Router();

//configurando los end points

//GET
router.get("/", async (req, res) => {
  const { limit } = req.query;
  const products = await productManager.getProducts();
  if (limit) {
    const nuevoLimite = products.splice(0, limit);
    res.json(nuevoLimite);
  } else {
    res.json(products);
  }
});

//GET:pid
router.get("/:pid", async (req, res) => {
  const productId = await productManager.getProductById(req.params);
  if (productId) {
    res.json(productId);
  } else {
    res.json({mesage: "producto no encontrado"});
  }
});

//POST
router.post("/", async(req, res)=>{
    const agregarProductos= await productManager.addProduct(req.body)
    res.status(201).json({status:"succes", agregarProductos})
})

//PUT
router.put("/products/:pid", async (req, res) => {
  const updatedproduct = await manager.updateProduct(req.params,req.body);
   res.json({ status: "success", updatedproduct });
});

//DELETE
router.delete("/products/:pid", async (req, res) => {
  const deleteproduct = await manager.deleteProduct(req.params);
   res.json({ status: "success",deleteproduct });
});

export default router;
