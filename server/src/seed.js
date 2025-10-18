import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js"; // Asegúrate de que la ruta sea correcta

dotenv.config();

const products = [
  {
    name: "Monstera Deliciosa",
    description: "Una planta tropical con hojas grandes y distintivas, perfecta para interiores.",
    price: 35000,
    image: "/plants/monstera.png",
    category: "interior",
    stock: 15,
  },
  {
    name: "Cactus Saguaro",
    description: "Un cactus icónico del desierto, de crecimiento lento y gran tamaño, ideal para exteriores.",
    price: 28000,
    image: "/plants/saguaro.png",
    category: "exterior",
    stock: 10,
  },
  {
    name: "Ficus Lyrata (Fiddle Leaf Fig)",
    description: "Conocido por sus grandes hojas en forma de violín, es una planta de interior muy popular.",
    price: 42000,
    image: "/plants/ficus.png",
    category: "interior",
    stock: 8,
  },
  {
    name: "Lavanda",
    description: "Una planta aromática con hermosas flores moradas, ideal para jardines y exteriores.",
    price: 18000,
    image: "/plants/lavanda.png",
    category: "exterior",
    stock: 20,
  },
  {
    name: "Pothos (Epipremnum aureum)",
    description: "Una planta de interior muy fácil de cuidar, ideal para principiantes, con hojas variegadas.",
    price: 15000,
    image: "/plants/pothos.png",
    category: "interior",
    stock: 25,
  },
  {
    name: "Suculenta Echeveria",
    description: "Una suculenta de bajo mantenimiento con una forma de roseta atractiva, perfecta para decoración.",
    price: 8000,
    image: "/plants/echeveria.png",
    category: "decoracion",
    stock: 30,
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Conectado a MongoDB para seeding");

    await Product.deleteMany({}); // Elimina todos los productos existentes
    console.log("🗑️ Productos existentes eliminados");

    await Product.insertMany(products); // Inserta los productos de ejemplo
    console.log("🌱 Productos de ejemplo insertados");

    await mongoose.connection.close();
    console.log(" desconectado de MongoDB");
  } catch (error) {
    console.error("❌ Error en el seeding de la base de datos:", error);
    process.exit(1);
  }
};

seedDB();
