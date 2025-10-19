import React, { useEffect, useReducer } from "react";
import CartContext from "./CartContext";
import CartReducer from "./CartReducer";

const CartState = ({ children }) => {
  const initialState = { items: [] };
  const [state, dispatch] = useReducer(CartReducer, initialState);

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) dispatch({ type: "HYDRATE", payload: JSON.parse(saved) });
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  const addToCart = (product) => dispatch({ type: "ADD_ITEM", payload: product });
  const removeOne = (id) => dispatch({ type: "REMOVE_ITEM", payload: id });
  const deleteItem = (id) => dispatch({ type: "DELETE_ITEM", payload: id });
  const clearCart = () => dispatch({ type: "CLEAR" });

  const total = state.items.reduce((acc, i) => acc + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ ...state, addToCart, removeOne, deleteItem, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartState;
