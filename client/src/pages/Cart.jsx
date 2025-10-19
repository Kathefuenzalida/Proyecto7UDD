import React, { useContext } from "react";
import CartContext from "../context/cart/CartContext";
import api from "../config/axios";

export default function Cart() {
  const { items, addToCart, removeOne, deleteItem, clearCart, total } = useContext(CartContext);

  const checkout = async () => {
    try {
      // MercadoPago sandbox: enviaremos un único ítem con el total
      const res = await api.post("/payments", {
        title: `Compra Botanic Soul (${items.length} producto/s)`,
        unit_price: Number(total),
        quantity: 1,
      });
      const pref = res.data?.id || res.data?.preferenceId || res.data?.init_point;
      if (!pref) throw new Error("Preferencia inválida");

      // redirección
      window.location.href = `https://www.mercadopago.cl/checkout/v1/redirect?pref_id=${pref}`;
    } catch (err) {
      console.error("❌ Error checkout:", err);
      alert("No se pudo iniciar el pago. Revisa consola.");
    }
  };

  if (!items.length) {
    return (
      <div className="container py-5">
        <h3>Tu carrito está vacío</h3>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h3 className="mb-3">Carrito</h3>

      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map(p => (
              <tr key={p._id}> {/* Usar p._id */}
                <td className="d-flex align-items-center gap-2">
                  <img alt={p.name} src={p.image} style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 8 }} />
                  {p.name}
                </td>
                <td>${p.price.toLocaleString("es-CL")}</td>
                <td>
                  <div className="btn-group">
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => removeOne(p._id)}>-</button> {/* Usar p._id */}
                    <span className="btn btn-sm btn-light disabled">{p.qty}</span>
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => addToCart(p)}>+</button>
                  </div>
                </td>
                <td>${(p.price * p.qty).toLocaleString("es-CL")}</td>
                <td>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => deleteItem(p._id)}> {/* Usar p._id */}
                    Quitar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-between">
        <button className="btn btn-outline-secondary" onClick={clearCart}>Vaciar carrito</button>
        <h4>Total: ${total.toLocaleString("es-CL")}</h4>
      </div>

      <div className="text-end mt-3">
        <button className="btn btn-success" onClick={checkout}>Pagar con Mercado Pago</button>
      </div>
    </div>
  );
}
