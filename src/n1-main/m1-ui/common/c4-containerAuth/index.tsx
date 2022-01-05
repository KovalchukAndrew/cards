import React from 'react';
import styles from './styles.module.scss'

export interface LayoutProps {
    children: React.ReactNode
    className?: string
    onClick?: any
}

const ContainerAuth = (props: LayoutProps) => {
    return (
        <div className={`${props.className} ${styles.loginMain}`} onClick={props.onClick}>
            {props.children}
        </div>
    );
};

export default ContainerAuth;
