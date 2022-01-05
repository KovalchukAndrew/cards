import React, {ChangeEvent} from 'react';
import FindTable from "./rp1-FindTable";
import Table from "./rp2-Table";
import Paginate from "./rp3-Pagination";
import styles from './styles.module.scss'
import {changePackName, getCardsPack, setPage, setRowsPerPage} from "../profileReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../m2-bll/store";

const RightPage = () => {
    const dispatch = useDispatch()
    const cardPacksTotalCount = useSelector<AppRootStateType, number | undefined>((state) => state.profile.cards?.cardPacksTotalCount)
    const page = useSelector<AppRootStateType, number>((state) => state.profile.page)
    const rowsPerPage = useSelector<AppRootStateType, number>((state) => state.profile.pageCount)

    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        dispatch(changePackName(e.currentTarget.value))
    }

    const searchPackHandler = () => {
        dispatch(getCardsPack())
    }

    return (
        <div className={styles.main}>
            <FindTable namePage={'Packs list'} nameBtn={'Add new pack'}
                       changeName={onChangeHandler} type={'added'} searchHandler={searchPackHandler}/>
            <Table/>
            <Paginate totalCount={cardPacksTotalCount} page={page} rowsPerPage={rowsPerPage} setPage={setPage}
                      setRowsPerPage={setRowsPerPage}/>
        </div>
    );
};

export default RightPage;
