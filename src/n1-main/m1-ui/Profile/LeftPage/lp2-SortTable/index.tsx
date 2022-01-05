import React, {useState} from 'react';
import SuperDoubleRange from "../../../common/c7 -SuperDoubleRange/SuperDoubleRange";
import {useDispatch} from "react-redux";
import {setChangeCardsNumber} from "../../profileReducer";
import styles from './../styles.module.scss'

const SortTable = () => {
    const dispatch = useDispatch()
    let [values, setValues] = useState<number[]>([0, 110])

    const handleChange = (newValue: number[]) => {
        setValues(newValue)
        console.log(newValue)
    }
    const onHandleChangeCommitted = (values: number[]) => {

        dispatch(setChangeCardsNumber(values[0], values[1]))
    }

    return (
        <div className={styles.rangeBlock}>
            <span className={styles.title}>Cards limit</span>
            <div className={styles.range}>
                <SuperDoubleRange
                    value={values}
                    onHandleChange={handleChange}
                    onHandleChangeCommitted={onHandleChangeCommitted}
                    min={0}
                    max={110}
                    step={1}
                />
            </div>
        </div>
    );
};

export default SortTable;
