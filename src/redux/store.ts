import { legacy_createStore as createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import authReducer from "./auth/reducer";
import { fetchUser} from "./auth/actions";

const rootReducer = combineReducers({
  auth: authReducer,
});

const token = localStorage.getItem("token") || sessionStorage.getItem("token");

const initialState: {
  auth: any
} = {
  auth: {
    token: token ? token : null,
    user: null,
    loading: false,
    error: null,
  },
};


const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

if (token) {
  store.dispatch(fetchUser(token));
}

export type AppState = ReturnType<typeof rootReducer>;
export default store;