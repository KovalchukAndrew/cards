import React, {ChangeEvent, useEffect, useState} from 'react';
import styles from "./style.module.scss"
import {CardType, getLearnCards, rateCardTC} from "../f2-cards/c2-bll/cardsReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../n1-main/m2-bll/store";
import {useNavigate, useParams} from "react-router-dom";
import ContainerAuth from "../../n1-main/m1-ui/common/c4-containerAuth";
import {
    Button,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    withStyles
} from "@material-ui/core";


const Learn = () => {
    const cards = useSelector<AppRootStateType, any>(state => state.cards.cards?.cards)
    const dispatch = useDispatch()
    const {id} = useParams<string>()
    const packName = useSelector<AppRootStateType, string | undefined>(state => state.profile.cards?.cardPacks.filter(el => el._id === id)[0].name)
    const [card, setCard] = useState<any>({});
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [valueGrade, setValueGrade] = useState<number>(0)
    const navigate = useNavigate()


    const rating = [
        {name: 'Не знаю', value: 1},
        {name: 'Забыл', value: 2},
        {name: 'Долго думал', value: 3},
        {name: 'Перепутал', value: 4},
        {name: 'Ответил', value: 5},
    ]

    useEffect(() => {
        dispatch(getLearnCards(id))
    }, [dispatch, id])

    useEffect(() => {
        if (cards?.length > 0) setCard(getCard(cards));
    }, [cards]);

    const getCard = (cards: CardType[]) => {
        const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
        const rand = Math.random() * sum;
        const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
                const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
                return {sum: newSum, id: newSum < rand ? i : acc.id}
            }
            , {sum: 0, id: -1});
        console.log('test: ', sum, rand, res)

        return cards[res.id + 1];
    }

    const onNext = () => {
        if (cards?.length > 0) {
            setCard(getCard(cards));
            setIsChecked(false)
        }
    }
    const onCheck = () => {
        setIsChecked(!isChecked)
    }

    const rateCard = (grade: number, card_id: string) => {
        if (valueGrade <= 0) return
        dispatch(rateCardTC(grade, card_id))
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValueGrade((Number((e.target as HTMLInputElement).value)));
    };
    const onCancel = () => {
        navigate('/')
    }

    return <ContainerAuth>
        <div className={styles.learnBlock}>
            {
                !isChecked ? (
                    <div className={styles.questionBlock}>
                        <h2 className={styles.headerCards}>Learn "{packName}"</h2>
                        <div className={styles.question}><span className={styles.bold}>Question</span>: {card.question}</div>
                    </div>
                ) : (
                    <>
                        <h2 className={styles.headerCards}>Learn "{packName}"</h2>
                        <div className={styles.question}><span className={styles.bold}>Question:</span> {card.question}</div>
                        <div className={styles.answer}><span className={styles.bold}>Answer:</span> {card.answer}</div>

                        <div>
                            <FormLabel component="legend">Rate yourself:</FormLabel>
                            {rating.map((g, i) => (
                                <RadioGroup
                                    onClick={() => {setValueGrade(g.value)}}
                                    key={'grade-' + i}
                                    value={valueGrade}
                                    onChange={handleChange}
                                    row
                                >
                                    <FormControlLabel  value={g.value} control={<Radio/>} label={g.name}/>
                                </RadioGroup>
                            ))}
                        </div>
                    </>
                )
            }
            <div className={styles.buttonBlock}>
                <Button variant="contained" size='small' onClick={onCancel}>Cancel</Button>
                {!isChecked && <Button variant="contained" size='small' onClick={onCheck}>Show answer</Button>}
                <Button style={{marginRight: "20px"}} variant="contained" size='small' onClick={() => {
                    onNext()
                    rateCard(valueGrade, card._id)
                    setValueGrade(0)
                }
                }>Next question
                </Button>
            </div>

        </div>

    </ContainerAuth>


}

export default Learn;