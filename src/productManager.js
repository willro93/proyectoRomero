import fs from "fs";

export default class ProductManager {
  constructor() {
    this.products = [];
    this.path = "./files";
  }
  //Lectura de productos
  getProducts = async () => {
    const getList = JSON.parse(
      await fs.promises.readFile(this.path + "/productos.json", "utf-8")
    );
    return getList;
  };

  //Método para crear un id
  idGenerator = () => {
    const count = this.products.length;
    if (count === 0) {
      return 1;
    } else {
      return this.products[count - 1].id + 1;
    }
  };

  //método para agregar productos
  addProduct = async (title, description, price, thumbnail, code, stock) => {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Es necesario llenar todos los campos");
      return;
    } else {
      const id = this.idGenerator();
      this.products.push({
        id,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      });
      //creación de directorio y archivo
      await fs.promises.mkdir(this.path, { recursive: true });
      await fs.promises.writeFile(
        this.path + "/productos.json",
        JSON.stringify(this.products, null, 2, "\t")
      );
    }
  };

  //Método para actualizar productos
  updateProducts = async (
    id,
    title,
    description,
    price,
    thumbnail,
    code,
    stock
  ) => {
    if (
      !id ||
      !title ||
      !description ||
      !price ||
      !thumbnail ||
      !code ||
      !stock
    ) {
      console.log("Es necesario llenar todos los campos");
      return;
    } else {
      const listaActual = await this.getProducts();
      const updatedArray = listaActual.map((element) => {
        if (element.id === id) {
          const updateElement = {
            ...element,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
          };
          return updateElement;
        } else {
          return element;
        }
      });
      await fs.promises.writeFile(
        this.path + "/productos.json",
        JSON.stringify(updatedArray, null, 2, "\t")
      );
    }
  };

  //encontrar un producto por su id
  getProductById = async (id) => {
    const product = this.products.find((element) => element.id === id);
    if (product) {
      return product;
    } else {
      console.log("Producto no encontrado");
    }
    JSON.parse(
      await fs.promises.readFile(this.path + "/productos.json", "utf-8")
    );
  };

  //Método para borrar productos
  deleteProduct = async (id) => {
    const listaPrevia = await this.getProducts();
    const product = listaPrevia.filter(element => element.id != id);
      await fs.promises.writeFile(
      this.path + "/productos.json",
      JSON.stringify(product, null, 2, "\t")
    );
    }
    
  };

