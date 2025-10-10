export default function CartReducer(state, action) {
  switch (action.type) {
    case "HYDRATE":
      return { ...state, ...action.payload };

    case "ADD_ITEM": {
      const exists = state.items.find(i => i.id === action.payload.id);
      const items = exists
        ? state.items.map(i => i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i)
        : [...state.items, { ...action.payload, qty: 1 }];
      return { ...state, items };
    }

    case "REMOVE_ITEM": {
      const items = state.items
        .map(i => i.id === action.payload ? { ...i, qty: i.qty - 1 } : i)
        .filter(i => i.qty > 0);
      return { ...state, items };
    }

    case "DELETE_ITEM":
      return { ...state, items: state.items.filter(i => i.id !== action.payload) };

    case "CLEAR":
      return { ...state, items: [] };

    default:
      return state;
  }
}
