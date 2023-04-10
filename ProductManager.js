const fs = require("fs");

const producto = [];

class ProductManager {
    constructor(filePath) {
        this.productos = producto;
        this.path = filePath;
    }

    addProduct = async (newProduct) => {
        this.getProducts();
        try {
            if (
                !newProduct.title ||
                !newProduct.desc ||
                !newProduct.precio ||
                !newProduct.code ||
                !newProduct.stock ||
                !newProduct.thumbnail
            )
                return "Completar todos los datos solicitados";

            let isProduct = this.productos.find((p) => p.code === newProduct.code);
            if (isProduct) return "Ya existe este producto";

            if (this.productos.length === 0) {
                return this.productos.push({ id: 1, ...newProduct });
            }

            let autoIncremento = this.productos[this.productos.length - 1].id + 1;

            this.productos,
                this.productos.push({ id: autoIncremento, ...newProduct });

            await fs.promises.writeFile(
                this.path,
                JSON.stringify(this.product, "utf-8", "\t")
            );

            return "Producto cargado";
        } catch (err) {
            return err;
        }
    };

    getProducts = async () => {
        try{
            const data = await fs.promises.readFile(this.path, 'utf-8')
            this.product = JSON.parse(data);
            return this.product
        }
        catch (error){
            return(error)
        }
    }

    getProductById = async (id) => {
        this.getProducts()
        let findProd = this.productos.find((p) => p.id === id);
        if (!findProd) return "Producto no encontrado";
        return findProd;
    }

    updateProduct  = async (id, updProd) => {
        try{
            let producto = this.product.find(prod => prod.id === id)
            if (!producto) return 'No encontrado'
            producto.title = updProd.title
            producto.description = updProd.description
            producto.price = updProd.price
            producto.thumbnail = updProd.thumbnail
            producto.stock = updProd.stock
            producto.code= updProd.code
            await fs.promises.writeFile(this.path, JSON.stringify(this.product,'utf-8','\t'))
            return 'Producto Actualizado'
            }
        catch (error){
            return(error)
        }
    }

    deleteProduct  = async (idDelete) => {
        try{
            const remove = this.product.filter(prod => prod.id !== idDelete) 
            if (!remove) return 'Id no encontrado'
            console.log(remove)
            await fs.promises.writeFile(this.path, JSON.stringify(remove,'utf-8','\t'))
            return 'Producto eliminado'
        }
        catch (error){
            return(error)
        }
    }
}

const products = new ProductManager('./Productos.json');
const fileUse = async() =>{
    console.log(await products.getProducts())
    console.log(await products.addProduct({title: 'producto prueba', description: 'Este es un producto prueba', price: 200, thumbnail: 'sin imagen', stock: 25, code: 'abc123'}))
    console.log(await products.addProduct({title: 'producto prueba2', description: 'Este es un producto prueba2', price: 200, thumbnail: 'sin imagen', stock: 200, code: 'abc124'}))
    console.log(await products.addProduct({title: 'producto prueba3', description: 'Este es un producto prueba3', price: 300, thumbnail: 'sin imagen', stock: 200, code: 'abc125'}))
    console.log(await products.getProducts())
    console.log(await products.updateProduct(1, {title: 'producto modificado', description: 'Este es un producto prueba', price: 200, thumbnail: 'sin imagen', stock: 200, code: 'abc125'}))
    console.log(await products.deleteProduct(2))
    console.log(await products.getProducts())
    console.table(await products.getProductById(2))
}
fileUse();