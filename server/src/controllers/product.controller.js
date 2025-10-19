import Product from "../models/Product.js";

// Crear un nuevo producto
export const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("❌ Error detallado al crear producto:", error); // Log completo del error
    res.status(500).json({ message: "Error al crear producto", error: error.message, details: error });
  }
};

// Obtener todos los productos
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos", error: error.message });
  }
};

// Obtener un producto por ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Producto no encontrado" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener producto", error: error.message });
  }
};

// Actualizar un producto
export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedProduct) return res.status(404).json({ message: "Producto no encontrado" });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar producto", error: error.message });
  }
};

// Eliminar un producto
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: "Producto no encontrado" });
    res.status(200).json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar producto", error: error.message });
  }
};
