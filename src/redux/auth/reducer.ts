import { actionTypes } from "../actionTypes";

interface AuthState {
  token: string | null;
  user: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
  loading: false,
  error: null,
};

export const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return { ...state, loading: true };
    case actionTypes.LOGIN_SUCCESS || actionTypes.REGISTER_SUCCESS || actionTypes.FETCH_USER:
      return { token: action.payload, loading: false, error: null };
    case actionTypes.LOGIN_FAILURE || actionTypes.REGISTER_FAILURE || actionTypes.FETCH_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case actionTypes.LOGOUT:
      return { token: null, loading: false, error: null };
    case actionTypes.PASSWORD_DONT_MATCH:
      return { ...state, error: "Passwords do not match" };
    case actionTypes.INVALID_PASSWORD || actionTypes.INVALID_USERNAME:
      return { ...state, error: action.payload };
    case actionTypes.INVALID_FORM:
      return { ...state, error: "Invalid form" };
    case actionTypes.CLEAR_ERROR:
      return { ...state, error: null };
    case actionTypes.FETCH_USER_REQUEST:
      return { ...state, loading: true };
    case actionTypes.FETCH_USER:
      return { ...state, user: action.payload, loading: false };
    case actionTypes.FETCH_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  };
};

export default authReducer;
