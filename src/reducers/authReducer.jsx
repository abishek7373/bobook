const initialState = {
  user: null,
  error: null,
  isLogged: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REGISTER_SUCCESS':
      return { ...state, user: action.payload, error: null, isLogged: false };
    case 'REGISTER_FAIL':
      return { ...state, error: action.payload };
    case 'LOGIN_SUCCESS':
      return { ...state, user: action.payload, error: null, isLogged: true };
    case 'LOGIN_FAIL':
      return { ...state, error: action.payload, isLogged: false };
    default:
      return state;
  }
};

export default authReducer;
