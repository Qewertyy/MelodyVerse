import { Dispatch } from "redux";
import axios from "..";
import { loginData, signUpData } from "../../types";
import { actionTypes } from "../actionTypes";
import { AxiosError, AxiosResponse } from "axios";

export const login = (payload: loginData) => async (dispatch: Dispatch) => {
  try {
    let data;
    dispatch({ type: actionTypes.LOGIN });
    const response: AxiosResponse | AxiosError = await axios
      .post("/api/auth/login", payload, {
        headers: { "Content-Type": "application/json" },
      })
      .catch((error) => error);
    if (response instanceof AxiosError) {
      if (response.response) {
        data = response.response.data;
      }else{
        dispatch({ type: actionTypes.LOGIN_FAILURE, payload: "Server error" });
      };
    } else {
      data = response.data;
    }
    if (data.success) {
      dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: data.token });
      if (
        payload.rememberMe === "true" ||
        payload.rememberMe === "on" ||
        payload.rememberMe
      ) {
        localStorage.setItem("token", data.token);
      } else {
        sessionStorage.setItem("token", data.token);
      }
    } else {
      dispatch({ type: actionTypes.LOGIN_FAILURE, payload: data.message });
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: actionTypes.LOGIN_FAILURE, payload: "Server error" });
  }
};

export const signup = (payload: signUpData) => async (dispatch: Dispatch) => {
  try {
    let data;
    dispatch({ type: actionTypes.REGISTER });

    const response = await axios
      .post("/api/auth/signup", payload, {
        headers: { "Content-Type": "application/json" },
      })
      .catch((error) => error);
    if (response instanceof AxiosError) {
      if (response.response) {
        data = response.response.data;
      }else{
        dispatch({ type: actionTypes.LOGIN_FAILURE, payload: "Server error" });
      }
    } else {
      data = response.data;
    };

    if (data.success) {
      dispatch({ type: actionTypes.REGISTER_SUCCESS, payload: data.token });
      localStorage.setItem("token", data.token);
    } else {
      dispatch({ type: actionTypes.REGISTER_FAILURE, payload: data.message });
    }
  } catch (error) {
    dispatch({ type: actionTypes.REGISTER_FAILURE, payload: "Server error" });
  }
};

export const logout = () => (dispatch: Dispatch) => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
  dispatch({ type: actionTypes.LOGOUT });
};

export const fetchUser = (token: string) => async (dispatch: Dispatch) => {
  try {
    let data;
    dispatch({ type: actionTypes.FETCH_USER_REQUEST });
    const response = await axios
      .post("/api/user", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => error);
    if (response instanceof AxiosError) {
      if (response.response) {
        data = response.response.data;
      }else {
        dispatch({ type: actionTypes.LOGIN_FAILURE, payload: "Server error" });
      }
    } else {
      data = response.data;
    }
    if (data.success) {
      dispatch({ type: actionTypes.FETCH_USER, payload: data.user });
    } else {
      dispatch({ type: actionTypes.FETCH_USER_FAILURE, payload: data });
    }
  } catch (error) {
    dispatch({ type: actionTypes.FETCH_USER_FAILURE, payload: "Server error" });
  }
};
