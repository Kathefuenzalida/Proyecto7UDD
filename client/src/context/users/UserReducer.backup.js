const UserReducer = (state, action) => {
  switch (action.type) {
    case "REGISTRO_EXITOSO":
    case "LOGIN_EXITOSO":
      return {
        ...state,
        user: action.payload,
        authStatus: true,
        loading: false,
      };
    case "OBTENER_USUARIO":
      return {
        ...state,
        user: action.payload,
        authStatus: true,
        loading: false,
      };
    case "CERRAR_SESION":
      return {
        ...state,
        user: null,
        authStatus: false,
        loading: false,
      };
    case "LOADING_FINISHED":
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default UserReducer;
