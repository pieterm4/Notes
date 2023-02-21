import React, { FC } from 'react';
import '../Authentication.css';
import Logo from '../../../components/logo/Logo';
import { Title } from '../../../components/title/Title';
import { ILoginRequest } from './ILoginRequest';
import { SubmitButton } from '../../../components/buttons/SubmitButton';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import useLogin from './LoginHook';

export const LoginPage: FC = () => {
    const { isLoading, handleLogin } = useLogin();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const loginRequest: ILoginRequest = {
            email: formData.get('email')?.toString(),
            password: formData.get('password')?.toString(),
        };

        handleLogin(loginRequest)
            .then(() => {})
            .catch(() => {});
    };

    return (
        <div className="AuthenticationPage">
            <div className="FormWrapper FadeInAnimation">
                <Logo />
                <Title text="Sign in" />
                <form onSubmit={handleSubmit}>
                    <input name="email" type="email" placeholder="Email address" />
                    <input name="password" type="password" placeholder="Password" />
                    <SubmitButton isLoading={isLoading} content="Sign in" />
                </form>
                <p>
                    You do not have an account?
                    <b>{<Link to="/register">Register</Link>}</b>
                </p>
            </div>
        </div>
    );
};
