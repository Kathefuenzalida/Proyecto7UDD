const UserReducer = (state, action) => {
  switch (action.type) {
    case "REGISTRO_EXITOSO":
    case "LOGIN_EXITOSO":
      return {
        ...state,
        user: action.payload,
        authStatus: true,
        loading: false,
        error: null,
      };
    case "OBTENER_USUARIO":
      return {
        ...state,
        user: action.payload,
        authStatus: true,
        loading: false,
        error: null,
      };
    case "CERRAR_SESION":
      return {
        ...state,
        user: null,
        authStatus: false,
        loading: false,
      };
    case "LOADING_START":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "LOADING_FINISHED":
      return {
        ...state,
        loading: false,
      };
    case "ERROR_REGISTRO":
    case "ERROR_LOGIN":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default UserReducer;
