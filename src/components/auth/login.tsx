import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { AuthFormProps, loginData } from "../../types";
import { PasswordInput } from "../ui/passwordInput";
import { Checkbox } from "../ui/checkbox";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/auth/actions";
import { AppState } from "../../redux/store";
import { actionTypes } from "../../redux/actionTypes";
import { ErrorAlert } from "../error";

export default function Login({ className, ...props }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector(
    (state: AppState) => state.auth
  );

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch({ type: actionTypes.CLEAR_ERROR });
      }, 3000);

      return () => clearTimeout(timer);
    };
    if (token) {
      navigate("/account");
    };
  }, [error, dispatch, token, navigate]);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    let formData = new FormData(event.currentTarget as HTMLFormElement) || null;
    if (!formData) {
      return;
    }
    const data = {} as loginData;
    formData.forEach((value, key) => {
      value = value.toString();
      data[key as keyof loginData] = value === "on" ? "true" : value;
    });
    await login(data)(dispatch);
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
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <PasswordInput
              id="password"
              placeholder="********"
              type="password"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              name="password"
              required
            />
          </div>
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox id="rememberMe" name="rememberMe" disabled={isLoading} />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember Me
            </label>
          </div>
          <Button disabled={isLoading} type="submit">
            {isLoading && (
              <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {loading ? "Logging in..." : "Sign In"}
          </Button>
        </div>
      </form>
    </div>
  );
}
