import React from 'react';
import { FC } from 'react';
import UserInfo from '../../features/userInformation/UserInfo';
import Logo from '../logo/Logo';
import './Header.css';

export const Header: FC = () => {
    return (
        <div className="headerContainer">
            <div className="logoContainer">
                <Logo />
            </div>
            <div className="userInfoContainer">
                <UserInfo />
            </div>
        </div>
    );
};
