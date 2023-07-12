class ProductManager {
  constructor() {
    this.products = [];
  }

  idGenerator = () => {
    const count = this.products.length;
    if (count === 0) {
      return 1;
    } else {
      return this.products[count - 1].id + 1;
    }
  };

  addProduct = (title, description, price, thumbnail, code, stock) => {
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
  };

  getProductById = (id) => {
    const product = this.products.find((element) => element.id === id);
    if (product) {
      return product;
    } else {
      console.log("Not found");
    }
  };

  getProduct = () => {
    return this.products;
  };
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
productManager.addProduct(
  "Acondicionador sólido",
  "Para cabello seco",
  "$140.00",
  "img2",
  "aco1",
  "700 unidades"
);
productManager.addProduct(
  "shampoo sólido 2",
  "El mejor shampoo 2",
  "$150.00",
  "img1",
  "shamp1",
  "500 unidades"
);
console.log(productManager.getProduct());
console.log(productManager.getProductById(2));
