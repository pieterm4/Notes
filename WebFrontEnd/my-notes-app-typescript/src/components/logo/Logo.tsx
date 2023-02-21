import React from 'react';
import logoImage from '../../Assets/Notes_Logo.png';
import './Logo.css';

export default function Logo(): JSX.Element {
    return (
        <div className="logo">
            <img src={logoImage} alt="" />
            <h2>My Notes</h2>
        </div>
    );
}
