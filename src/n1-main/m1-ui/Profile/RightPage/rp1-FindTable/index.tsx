import React, {ChangeEvent, useState} from 'react';
import styles from './styles.module.scss'
import {Button, InputAdornment, TextField, withStyles} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import SuperButton from "../../../common/c1-SuperButton/SuperButton";
import {addCardPack} from "../../profileReducer";
import Modal, {ModalTypeAction} from "../../../common/modal";
import {useDispatch, useSelector} from "react-redux";
import {addCardTC} from "../../../../../n2-features/f2-cards/c2-bll/cardsReducer";
import {AppRootStateType} from "../../../../m2-bll/store";
import {useNavigate, useParams} from "react-router-dom";
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';

type FindTableType = {
    namePage: string | undefined
    nameBtn: string
    changeName: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
    type: 'added' | 'addedItem'
    searchHandler: () => void
}

const FindTable = (props: FindTableType) => {
    const dispatch = useDispatch()
    const userIDCard = useSelector<AppRootStateType, any>((state) => state.cards.cards)
    const profileID = useSelector<AppRootStateType, string>((state) => state.login.profileData._id)
    const [openModal, setOpenModal] = useState(false)
    const [type, setType] = useState<ModalTypeAction>('')
    const {id} = useParams()
    const navigate = useNavigate()
    const updateCardPack = (value?: string, value2?: string) => {
        props.type === 'added' && (type === props.type && dispatch(addCardPack(value)))
        props.type === 'addedItem' && (type === props.type && dispatch(addCardTC(id, value2, value)))
    }
    const buttonHandler = () => {
        props.type === 'added' && setType('added')
        props.type === 'addedItem' && setType('addedItem')
        setOpenModal(true)
    }

    const backHandler = () => {
        navigate('/')
    }

    return (
        <>
            <Modal openModal={openModal} setOpenModal={setOpenModal} setActionTC={updateCardPack} type={type}/>
            {props.type === 'added'
                ? <h1>{props.namePage}</h1>
                : <h1 className={styles.header}><ArrowBackOutlinedIcon className={styles.arrow} onClick={backHandler} fontSize="large"/> {props.namePage}</h1>}
            <div className={styles.findTable}>
                <div className={styles.findInput}>
                    <TextField id="outlined-basic"
                               onChange={props.changeName}
                               style={{backgroundColor: '#ececf9'}}
                               size="small"
                               variant="outlined"
                               fullWidth
                               InputProps={{
                                   startAdornment: (
                                       <InputAdornment position="start">
                                           <SearchIcon color="action"/>
                                       </InputAdornment>
                                   ),
                               }}/>
                    <Button onClick={props.searchHandler} variant="contained" size="small">Search</Button>
                </div>
                {(userIDCard?.packUserId === profileID || props.type === 'added') && (
                    <SuperButton className={styles.btn} onClick={buttonHandler.bind(null)}>
                        {props.nameBtn}
                    </SuperButton>
                )}
            </div>
        </>
    )
};

export default FindTable;
