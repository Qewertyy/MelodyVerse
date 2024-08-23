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
    case actionTypes.FETCH_USER_REQUEST:
      return { ...state, loading: true };

    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.REGISTER_SUCCESS:
      return { ...state, token: action.payload, loading: false, error: null };

    case actionTypes.FETCH_USER:
      return { ...state, user: action.payload, loading: false, error: null };

    case actionTypes.LOGIN_FAILURE:
    case actionTypes.REGISTER_FAILURE:
    case actionTypes.FETCH_USER_FAILURE:
    case actionTypes.INVALID_PASSWORD:
    case actionTypes.INVALID_USERNAME:
      return { ...state, loading: false, error: action.payload };

    case actionTypes.LOGOUT:
      return { ...state, token: null, user: null, loading: false, error: null };

    case actionTypes.PASSWORD_DONT_MATCH:
      return { ...state, error: "Passwords do not match" };

    case actionTypes.INVALID_FORM:
      return { ...state, error: "Invalid form" };

    case actionTypes.CLEAR_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};

export default authReducer;
