import React from 'react'
import styles from './style.regist.module.scss'
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import SuperInputText from "../../../n1-main/m1-ui/common/c2-SuperInputText/SuperInputText";
import SuperButton from "../../../n1-main/m1-ui/common/c1-SuperButton/SuperButton";
import {registrateTC} from "./registerReducer";
import {AppRootStateType} from "../../../n1-main/m2-bll/store";
import ContainerAuth from "../../../n1-main/m1-ui/common/c4-containerAuth";

type FormikErrorType = {
    email?: string
    password?: string
    repeatPassword?: string
}


export const Registration = () => {
    const isRegistrate = useSelector<AppRootStateType, boolean>(state => state.register.isRegistrate)
    const err = useSelector<AppRootStateType, string>(state => state.register.errorRegist)
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            repeatPassword: '',

        },
        validate: values => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length <= 2) {
                errors.password = 'Invalid password';
            }
            if (!values.repeatPassword) {
                errors.repeatPassword = 'Required';
            } else if (values.repeatPassword !== values.password) {
                errors.repeatPassword = 'Invalid repeat password';
            }
            return errors;
        },

        onSubmit: values => {
            const data = {
                email: values.email,
                password: values.password
            }
            formik.resetForm()
            dispatch(registrateTC(data))
        },
    })


    if (isRegistrate) {
        return <Navigate to={"/login"}/>
    }

    return (
        <ContainerAuth>
            <div className={styles.registration}>
                <div className={styles.intro}>
                    <h1>It-incubator</h1>
                    <h3>Registration</h3>
                </div>
                <form onSubmit={formik.handleSubmit}>

                    <div className={styles.inputs}>
                        <div className={styles.inputsBox}>
                            <label className={styles.label}>Email</label>
                            <SuperInputText className={styles.input}
                                            name="email"
                                            type="email"
                                            onChange={formik.handleChange}
                                            value={formik.values.email}
                            />
                        </div>
                        {
                            formik.touched.email &&
                            formik.errors.email ? <span className={styles.error}>{formik.errors.email}</span> : <span className={styles.error}></span>}

                        <div className={styles.inputsBox}>
                            <label className={styles.label}>Password</label>
                            <SuperInputText className={styles.input}
                                            name="password"
                                            type="password"
                                            onChange={formik.handleChange}
                                            value={formik.values.password}
                            />
                        </div>
                        {
                            formik.touched.email &&
                            formik.errors.password ? <span className={styles.error}>{formik.errors.password}</span> : <span className={styles.error}></span>}

                        <div className={styles.inputsBox}>
                            <label className={styles.label}>Repeat password</label>
                            <SuperInputText className={styles.input}
                                            name="repeatPassword"
                                            type="password"
                                            onChange={formik.handleChange}
                                            value={formik.values.repeatPassword}
                            />
                        </div>
                        {
                            formik.touched.email &&
                            formik.errors.repeatPassword ?
                                <span className={styles.error}>{formik.errors.repeatPassword}</span> : <span className={styles.error}></span>}

                        <div className={styles.next}>
                            <SuperButton className={styles.btn}
                                         type={'submit'}>
                                Registration
                            </SuperButton>
                        </div>

                        <span className={styles.error}>{err}</span>

                    </div>


                </form>
            </div>
        </ContainerAuth>


    )
}
