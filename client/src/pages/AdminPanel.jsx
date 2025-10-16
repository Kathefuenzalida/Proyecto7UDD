import React, { useState, useEffect, useContext } from "react";
import api from "../config/axios"; // instancia de Axios con la URL del backend
import UserContext from "../context/users/UserContext";

function AdminPanel() {
  const { user } = useContext(UserContext); // 👉 ahora usamos el usuario logueado
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "interior",
    stock: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔹 Obtener productos al montar el componente
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.error("❌ Error al obtener productos:", error);
    }
  };

  // 🔹 Manejar cambios en el formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Crear o editar producto
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price) {
      alert("Por favor completa al menos nombre y precio");
      return;
    }

    try {
      setLoading(true);

      if (editingId) {
        await api.put(`/products/${editingId}`, form);
        alert("Producto actualizado correctamente ✅");
      } else {
        await api.post("/products", form);
        alert("Producto creado correctamente 🌱");
      }

      setForm({
        name: "",
        description: "",
        price: "",
        image: "",
        category: "interior",
        stock: "",
      });
      setEditingId(null);
      fetchProducts();
    } catch (error) {
      console.error("❌ Error al guardar producto:", error);
      alert("Error al guardar producto. Asegúrate de tener rol admin.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Cargar datos en el formulario al editar
  const handleEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category,
      stock: product.stock,
    });
    setEditingId(product._id);
  };

  // 🔹 Eliminar producto
  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este producto?")) {
      try {
        await api.delete(`/products/${id}`);
        fetchProducts();
        alert("Producto eliminado correctamente 🗑️");
      } catch (error) {
        console.error("❌ Error al eliminar producto:", error);
        alert("Error al eliminar producto. Verifica tu rol admin.");
      }
    }
  };

  // 🔹 Validación opcional de acceso (solo admins)
  if (user && user.role !== "admin") {
    return (
      <div className="container mt-5 text-center">
        <h3 className="text-danger fw-bold">Acceso restringido 🚫</h3>
        <p>Solo los administradores pueden acceder a este panel.</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 fw-bold" style={{ color: "#2e4635" }}>
        Panel de Administración {user && `– Bienvenida, ${user.username}`}
      </h2>

      {/* ✅ Formulario */}
      <div className="card p-4 mb-4 shadow-sm">
        <h5>{editingId ? "Editar producto" : "Crear nuevo producto"}</h5>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <input
                type="text"
                name="name"
                placeholder="Nombre del producto"
                className="form-control"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="number"
                name="price"
                placeholder="Precio"
                className="form-control"
                value={form.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <select
                name="category"
                className="form-select"
                value={form.category}
                onChange={handleChange}
              >
                <option value="interior">Planta de interior</option>
                <option value="exterior">Planta de exterior</option>
                <option value="decoracion">Decoración</option>
              </select>
            </div>
            <div className="col-md-6">
              <input
                type="number"
                name="stock"
                placeholder="Stock"
                className="form-control"
                value={form.stock}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-12">
              <textarea
                name="description"
                placeholder="Descripción del producto"
                className="form-control"
                value={form.description}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-12">
              <input
                type="text"
                name="image"
                placeholder="Ruta de la imagen (ej: /plants/ficus.png)"
                className="form-control"
                value={form.image}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-dark w-100 mt-3"
            disabled={loading}
          >
            {loading
              ? "Guardando..."
              : editingId
              ? "Actualizar producto"
              : "Crear producto"}
          </button>
        </form>
      </div>

      {/* ✅ Listado */}
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Categoría</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>${p.price.toLocaleString("es-CL")}</td>
                <td>{p.category}</td>
                <td>{p.stock}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-success me-2"
                    onClick={() => handleEdit(p)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(p._id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPanel;