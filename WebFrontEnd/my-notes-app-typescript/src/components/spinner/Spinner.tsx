import React from 'react';
import { FC } from 'react';
import './Spinner.css';

interface ISpinerProps {
    isVisible: boolean;
}

export const Spinner: FC<ISpinerProps> = (props: ISpinerProps) => {
    return <div className={`${props.isVisible ? 'spinner-start' : 'spinner-stop'}`}></div>;
};
