import React, {ChangeEvent} from 'react'
import {Slider} from "@material-ui/core";

type SuperDoubleRangePropsType = {
    onHandleChange?: (newValue: number[]) => void
    onHandleChangeCommitted?: (newValues: number[]) => void
    value?: number[]
    min: number
    max: number
    step: number | null
}

const SuperDoubleRange: React.FC<SuperDoubleRangePropsType> = (
    {
        onHandleChange, value,
        min, max, step,
        onHandleChangeCommitted
    }
) => {

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number | number[]) => {
        onHandleChange && onHandleChange(newValue as [number, number])
    };
    const handleChanges = (event: React.ChangeEvent<{}>, newValues: number | number[]) => {
        onHandleChangeCommitted && onHandleChangeCommitted(newValues as [number, number])
    };

    return (
        <div>
            <Slider
                value={value}
                valueLabelDisplay="auto"
                onChange={handleChange}
                onChangeCommitted={handleChanges}
                aria-labelledby="range-slider"
                min={min}
                max={max}
                step={step}
            />
        </div>
    )
}

export default SuperDoubleRange
