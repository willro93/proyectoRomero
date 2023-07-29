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
  addProduct = async (obj) => {
    const {
      title,
      description,
      price,
      thumbnail,
      category,
      status = true,
      code,
      stock,
    } = obj;
    const listaVacia = await this.getProducts();
    if (
      !title ||
      !description ||
      !price ||
      !category ||
      !code ||
      !status ||
      !stock
    ) {
      console.log("Es necesario llenar todos los campos");
      return;
    } else {
      const id = this.idGenerator();
      listaVacia.push({
        id,
        title,
        description,
        price,
        category,
        status,
        thumbnail,
        code,
        stock,
      });
      //creación de directorio y archivo
      await fs.promises.mkdir(this.path, { recursive: true });
      await fs.promises.writeFile(
        this.path + "/productos.json",
        JSON.stringify(listaVacia, null, 2, "\t")
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
    const { pid } = id;
    const listaProductos = await this.getProducts();
    const product = listaProductos.find(
      (element) => element.id === parseInt(pid)
    );
    if (product) {
      return product;
    } else {
      //console.log("Producto no encontrado");
    }
  };

  //Método para borrar productos
  deleteProduct = async (id) => {
    const listaPrevia = await this.getProducts();
    const product = listaPrevia.filter((element) => element.id != id);
    await fs.promises.writeFile(
      this.path + "/productos.json",
      JSON.stringify(product, null, 2, "\t")
    );
  };
}

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
