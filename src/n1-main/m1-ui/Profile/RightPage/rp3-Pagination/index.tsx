import React from 'react';
import styles from './styles.module.scss'
import {Pagination} from "@material-ui/lab";
import {useDispatch} from "react-redux";
import {FormControl, MenuItem, Select} from "@material-ui/core";

type PaginateType = {
    totalCount: number | undefined
    page: number
    rowsPerPage: number
    setPage: (newPage: number) => void
    setRowsPerPage: (value: number) => void
}

const Paginate = (props: PaginateType) => {

    const dispatch = useDispatch()

    //@ts-ignore
    const pageCount = Math.ceil(props.totalCount / props.rowsPerPage)

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(props.setPage(value))
    };

    const changeRowsPerPage = (event: React.ChangeEvent<{ value: unknown }>) => {
        dispatch(props.setRowsPerPage(Number(event.target.value)))
    };

    return (
        <div className={styles.pagination}>
            <Pagination count={pageCount}
                        size="small"
                        shape="rounded"
                        color="primary"
                        variant="outlined"
                        page={props.page}
                        onChange={handleChange}
            />
            <div className={styles.rowsPerPage}>
                <span style={{marginRight: '10px'}}>Show</span>
                <FormControl size="small" variant="outlined"
                             className={styles.formControl}>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={props.rowsPerPage}
                        onChange={changeRowsPerPage}
                    >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={9}>9</MenuItem>
                        <MenuItem value={15}>15</MenuItem>
                        <MenuItem value={25}>25</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={100}>100</MenuItem>
                    </Select>
                </FormControl>
                <span style={{marginLeft: '10px'}}>Cards per Page</span>
            </div>

        </div>
    );
};

export default Paginate;
