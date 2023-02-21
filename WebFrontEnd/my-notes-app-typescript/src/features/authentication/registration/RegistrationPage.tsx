import React, { FC } from "react";
import "../Authentication.css";
import Logo from "../../../components/logo/Logo";
import { Title } from "../../../components/title/Title";
import { Link } from "react-router-dom";
import { SubmitButton } from "../../../components/buttons/SubmitButton";

interface RegistrationInfo {
  email: string | null | undefined;
  password: string | null | undefined;
  confirmPassword: string | null | undefined;
}

export const RegistrationPage: FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const loginInfo: RegistrationInfo = {
      email: data.get("email")?.toString(),
      password: data.get("password")?.toString(),
      confirmPassword: data.get("confirmPassword")?.toString(),
    };

    console.log(loginInfo);
  };
  return (
    <div className="AuthenticationPage">
      <div className="FormWrapper FadeInAnimation">
        <Logo />
        <Title text="Sign up" />
        <form onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email address"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            required
          />
          <SubmitButton content="Sign up" isLoading={false} />
        </form>
        <p>
          You already have an account? <b>{<Link to="/login">Login</Link>}</b>
        </p>
      </div>
    </div>
  );
};
