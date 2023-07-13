const fs = require("fs");

class ProductManager {
  constructor() {
    this.products = [];
    this.path = "./files";
  }

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
    try{
      await fs.promises.mkdir(this.path, { recursive: true });
    await fs.promises.writeFile(
      this.path + "/productos.json",
      JSON.stringify(this.products, null, 2, "\t")
    );}
    catch(error){
      console.log(`Error al crear el archivo ${JSON.stringify(this.products, null, 2, "\t")},${error}`
      )};
    
  };

  getProductById = (id) => {
    const product = this.products.find((element) => element.id === id);
    if (product) {
      return product;
    } else {
      console.log("Not found");
    }
  };

  getProducts = () => {
    return this.products;
  };

  updateProducts = (id) => {};
}

const productManager = new ProductManager();
productManager.addProduct(
  "shampoo sólido",
  "El mejor shampoo",
  "$150.00",
  "img1",
  "shamp1",
  "500 unidades"
);
//productManager.addProduct(
//  "Acondicionador sólido",
//  "Para cabello seco",
//  "$140.00",
//  "img2",
//  "aco1",
//  "700 unidades"
//);
//productManager.addProduct(
//  "shampoo sólido 2",
//  "El mejor shampoo 2",
//  "$150.00",
//  "img1",
//  "shamp1",
//  "500 unidades"
//);
console.log(productManager.getProducts());
//console.log(productManager.getProductById(2));
