import React from 'react';
import User from "./lp1-User";
import SortTable from "./lp2-SortTable";
import styles from './styles.module.scss'
import SortTableById from "./lp3-SortTableById/SortTableById";

const LeftPage = () => {
    return (
        <div className={styles.main}>
            <User/>
            <div className={styles.sortBlock}>
                <SortTableById/>
                <SortTable/>
            </div>
        </div>
    );
};

export default LeftPage;
