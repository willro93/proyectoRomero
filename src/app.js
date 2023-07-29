import express from "express";
import productsRoutes from "./routes/products.route.js"

//declarar funcionalidades de express y el puerto a utilizar
const app = express();
const PORT = 8080;

//Middleware para poder usar los req.query yrecibir objetos JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//agregando rutas hacía los archivos route
app.use("/api/products", productsRoutes)

app.use("/api/carts", productsRoutes)


//Puerto donde se escucha
app.listen(PORT, () => {
  console.log(`Puerto ${PORT} levantado`);
});
