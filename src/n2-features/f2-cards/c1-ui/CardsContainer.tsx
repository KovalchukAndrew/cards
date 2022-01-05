import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import ContainerAuth from "../../../n1-main/m1-ui/common/c4-containerAuth";
import Cards from "./Cards";
import styles from "./CardsContainer.module.scss"
import {useParams} from "react-router-dom";
import {getCards} from "../c2-bll/cardsReducer";
import {AppRootStateType} from "../../../n1-main/m2-bll/store";

export const CardsContainer = () => {

    const dispatch = useDispatch()
    const sortName = useSelector<AppRootStateType, string>((state) => state.cards.sortName)
    const sortByCards = useSelector<AppRootStateType, number>((state) => state.cards.sortByCards)
    const page = useSelector<AppRootStateType, number>(state => state.cards.page)
    const rowsPerPage = useSelector<AppRootStateType, number>(state => state.cards.pageCount)


    const {id} = useParams<string>()
    useEffect(() => {
        dispatch(getCards(id))
    }, [dispatch, sortName, sortByCards, page, rowsPerPage, id])

    return (
        <ContainerAuth>
            <div className={styles.main}>
                <Cards/>
            </div>
        </ContainerAuth>

    )
}