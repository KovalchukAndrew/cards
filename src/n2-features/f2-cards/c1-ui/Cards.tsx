import FindTable from "../../../n1-main/m1-ui/Profile/RightPage/rp1-FindTable";
import Paginate from "../../../n1-main/m1-ui/Profile/RightPage/rp3-Pagination";
import React, {ChangeEvent} from "react";
import TableCards from "./TableCards";
import styles from "./Cards.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../n1-main/m2-bll/store";
import {useParams} from "react-router-dom";
import {
    changeSearchName,
    getCards,
    setPage,
    setRowsPerPage
} from "../c2-bll/cardsReducer";


const Cards = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const cardTotalCount = useSelector<AppRootStateType, number | undefined>((state) => state.cards.cards?.cardsTotalCount)
    const page = useSelector<AppRootStateType, number>((state) => state.cards.page)
    const rowsPerPage = useSelector<AppRootStateType, number>((state) => state.cards.pageCount)
    const packName = useSelector<AppRootStateType, string | undefined>(state => state.profile.cards?.cardPacks.filter(el => el._id === id)[0].name)

    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        dispatch(changeSearchName(e.currentTarget.value))
    }
    const searchCardsHandler = () => {
        dispatch(getCards(id))
    }

    return (
        <div className={styles.main}>
            <FindTable type={'addedItem'} namePage={packName} nameBtn={'Add card'} changeName={onChangeHandler} searchHandler={searchCardsHandler}/>
            <TableCards/>
            <Paginate totalCount={cardTotalCount} page={page} rowsPerPage={rowsPerPage} setPage={setPage}
                      setRowsPerPage={setRowsPerPage}/>
        </div>
    );
};

export default Cards;