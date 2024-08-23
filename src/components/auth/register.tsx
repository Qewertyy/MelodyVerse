import React, { useEffect } from "react";
import { cn, validatePassword } from "../../lib/utils";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { AuthFormProps, signUpData } from "../../types";
import { PasswordInput } from "../ui/passwordInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup } from "../../redux/auth/actions";
import { AppState } from "../../redux/store";
import { actionTypes } from "../../redux/actionTypes";
import { ErrorAlert } from "../error";

export default function Register({ className, ...props }: AuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector(
    (state: AppState) => state.auth
  );
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch({ type: actionTypes.CLEAR_ERROR });
      }, 4000);

      return () => clearTimeout(timer);
    }
    if (token) {
      navigate("/account");
    }
  }, [error, dispatch, token, navigate]);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    let formData = new FormData(event.currentTarget as HTMLFormElement) || null;
    if (!formData) {
      dispatch({ type: actionTypes.INVALID_FORM });
      setIsLoading(loading);
      return;
    }
    const data = {} as signUpData;
    formData.forEach((value, key) => {
      data[key as keyof signUpData] = value.toString();
    });
    const { cnfPassword, ...rest } = data;
    if (rest.password !== cnfPassword) {
      dispatch({ type: actionTypes.PASSWORD_DONT_MATCH });
      setIsLoading(loading);
      return;
    }
    const usernameValidation = validatePassword(rest.username);
    if (usernameValidation.valid === false) {
      dispatch({
        type: actionTypes.INVALID_USERNAME,
        payload: usernameValidation.errors,
      });
      setIsLoading(loading);
      return;
    };
    const passwordValidation = validatePassword(rest.password);
    if (passwordValidation.valid === false) {
      dispatch({
        type: actionTypes.INVALID_PASSWORD,
        payload: passwordValidation.errors,
      });
      setIsLoading(loading);
      return;
    };
    await signup(rest)(dispatch);
    setIsLoading(false);
  }
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      {error && <ErrorAlert error={error} />}
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-3">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              name="email"
              required
            />
            <Label className="sr-only" htmlFor="username">
              Username
            </Label>
            <Input
              id="username"
              placeholder="Qewertyy"
              disabled={isLoading}
              name="username"
              required
            />
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <PasswordInput
              id="password"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
              name="password"
              required
            />
            <Label className="sr-only" htmlFor="cnfPassword">
              Confirm Password
            </Label>
            <PasswordInput
              id="cnfPassword"
              placeholder="Confirm Password"
              type="password"
              autoCapitalize="none"
              autoComplete="cnfPassword"
              autoCorrect="off"
              disabled={isLoading}
              name="cnfPassword"
              required
            />
          </div>
          <Button disabled={isLoading} type="submit">
            {isLoading && (
              <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
        </div>
      </form>
    </div>
  );
}
