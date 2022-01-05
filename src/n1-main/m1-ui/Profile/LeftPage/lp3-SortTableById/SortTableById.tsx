import React from 'react';
import styles from './../styles.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../m2-bll/store";
import {setChangeSortCardsById} from "../../profileReducer";

const SortTableById = () => {
    const userId = useSelector<AppRootStateType, string>(state => state.login.profileData._id)
    const dispatch = useDispatch()

    const onMyClick = () => {
        dispatch(setChangeSortCardsById(userId))
    }
    const onAllClick = () => {
        dispatch(setChangeSortCardsById(""))
    }

    return (
        <div className={styles.idSortBlock}>
            <span className={styles.title}>View packs</span>
            <div>
                <span className={styles.btn} onClick={onMyClick}>My</span>
                <span className={styles.btn} onClick={onAllClick}>All</span>
            </div>

        </div>
    );
};

export default SortTableById;