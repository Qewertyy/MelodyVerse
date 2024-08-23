import React from "react";

export interface AuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export type signUpData = {
  email: string;
  username: string;
  password: string;
  cnfPassword?: string;
};

export type loginData = {
  email: string;
  password: string;
  rememberMe?: string;
};
