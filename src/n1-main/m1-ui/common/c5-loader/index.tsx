import React from 'react';
import styles from './styles.module.scss'
import ContainerAuth from "../c4-containerAuth";

const PreLoader = () => {
    return (
        <ContainerAuth>
            <div className={styles.loading}>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
            </div>
        </ContainerAuth>
    );
};

export default PreLoader;
