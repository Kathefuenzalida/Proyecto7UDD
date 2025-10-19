export default function CartReducer(state, action) {
  switch (action.type) {
    case "HYDRATE":
      return { ...state, ...action.payload };

    case "ADD_ITEM": {
      const exists = state.items.find(i => i._id === action.payload._id); // Usar _id
      const items = exists
        ? state.items.map(i => i._id === action.payload._id ? { ...i, qty: i.qty + 1 } : i) // Usar _id
        : [...state.items, { ...action.payload, qty: 1 }];
      return { ...state, items };
    }

    case "REMOVE_ITEM": {
      const items = state.items
        .map(i => i._id === action.payload ? { ...i, qty: i.qty - 1 } : i) // Usar _id
        .filter(i => i.qty > 0);
      return { ...state, items };
    }

    case "DELETE_ITEM":
      return { ...state, items: state.items.filter(i => i._id !== action.payload) }; // Usar _id

    case "CLEAR":
      return { ...state, items: [] };

    default:
      return state;
  }
}
