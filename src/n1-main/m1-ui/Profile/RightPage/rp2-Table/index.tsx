import React, {useEffect, useState} from 'react';
import styles from './styles.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../m2-bll/store";
import {useNavigate} from "react-router-dom";
import {
    CardType,
    deleteCardPackTC,
    GetCardsType,
    setChangeSortCards,
    updateCardPackTC
} from "../../profileReducer";
import Modal, {ModalTypeAction} from "../../../common/modal";


const header = ['Name', 'Cards', 'Last Update', 'Created by', 'Actions']

const Table = () => {
    const rows = useSelector<AppRootStateType, GetCardsType | null>((state) => state.profile.cards)
    const sortCards = useSelector<AppRootStateType, number>((state) => state.profile.sortCards)
    const profileID = useSelector<AppRootStateType, string>((state) => state.login.profileData._id)
    const [nameHeader, setNameHeader] = useState('')
    const [openModal, setOpenModal] = useState(false)
    const [type, setType] = useState<ModalTypeAction>('')
    const [cardID, setCardID] = useState('')

    useEffect(() => {
        const scrollContainer = document.querySelectorAll("#table");

        scrollContainer.forEach((el) => {
            el.addEventListener("wheel", (evt: any) => {
                evt.preventDefault();
                el.scrollLeft += evt.deltaY;
            });
        })

        return () => {
            scrollContainer.forEach((el) => {
                el.removeEventListener("wheel", (evt: any) => {
                    evt.preventDefault();
                    el.scrollLeft += evt.deltaY;
                });
            })
        }
    });

    const dispatch = useDispatch()

    const changeSortCards = (name: string) => {
        const nameClick = name === 'Cards' ? 'cardsCount' : 'updated'
        if (name === 'Cards' || name === 'Last Update') {
            if (sortCards === 0) {
                dispatch(setChangeSortCards(1, nameClick))
            } else {
                dispatch(setChangeSortCards(0, nameClick))
            }
        }
        setNameHeader(name)
    }

    const changeStyleSortCard =
        ((nameHeader === 'Cards' && sortCards !== 0) && styles.activeCards) ||
        ((nameHeader === 'Last Update' && sortCards !== 0) && styles.activeUpdate)

    const navigate = useNavigate()
    const CardsHandler = (id: string) => {
        navigate(`/cards/${id}`)
        setCardID(id)
    }
    const nameHandler = (id: string) => {
        //dispatch(setPage(num.length))
        navigate(`/learn/${id}`)
    }

    const updateCardPack = (value?: string) => {
        type === 'edit' && dispatch(updateCardPackTC({cardsPack: {_id: cardID, name: value}}))
        type === 'delete' && dispatch(deleteCardPackTC(cardID))
    }
    const buttonHandler = (id: string, type: ModalTypeAction) => {
        setCardID(id)
        setType(type)
        setOpenModal(true)
    }
    return (
        <div className={styles.table}>
            <Modal openModal={openModal} setOpenModal={setOpenModal} setActionTC={updateCardPack} type={type}/>
            <div className={styles.thead}>

                {header.map(headerGroup => (
                    <div className={`${styles.tableHeader} ${changeStyleSortCard}`}
                         key={headerGroup}
                         onClick={changeSortCards.bind(null, headerGroup)}>
                        <h4 className={styles.column}>
                            {headerGroup}
                        </h4>
                    </div>
                ))}
            </div>

            <div className={styles.rows}>

                {rows?.cardPacks.map((row: CardType) => {
                    return (
                        <div className={styles.rowe} key={row._id}>
                            <div className={styles.row}>


                                <span className={`${styles.rowItem} ${styles.nameStyle}`} id={'table'} onClick={() => nameHandler(row._id)}>{row.name}</span>
                                <span className={styles.rowItem} id={'table'}>{row.cardsCount}</span>
                                <span className={styles.rowItem} id={'table'}>{row.updated.slice(0, 10)}</span>
                                <span className={styles.rowItem} id={'table'}> {row.user_name}</span>

                                <div className={`${styles.rowItem} ${styles.btnBox}`}>
                                    {profileID === row.user_id &&
                                    (<>
                                    <span className={styles.btn} data-color
                                          onClick={buttonHandler.bind(null, row._id, 'delete')}>Delete</span>
                                        <span className={styles.btn}
                                              onClick={buttonHandler.bind(null, row._id, 'edit')}>Edit</span>
                                    </>)
                                    }
                                    <span onClick={() => {
                                        CardsHandler(row._id)
                                    }} className={styles.btn}>Cards</span>
                                </div>

                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    );
};

export default Table;
