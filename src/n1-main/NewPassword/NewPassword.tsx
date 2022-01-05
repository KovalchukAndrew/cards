import {useFormik} from "formik";
import {Navigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import SuperInputText from "../m1-ui/common/c2-SuperInputText/SuperInputText";
import SuperButton from "../m1-ui/common/c1-SuperButton/SuperButton";
import {FormikErrorNewPasswordType} from "./newPasswordAPI";
import {setPassword} from "./newPassReducer";
import {AppRootStateType} from "../m2-bll/store";
import React from "react";
import ContainerAuth from "../m1-ui/common/c4-containerAuth";
import styles from './NewPassword.module.scss'

export const NewPassword = () => {

    const dispatch = useDispatch()
    const {token} = useParams<string>()
    const error = useSelector<AppRootStateType, string>(state => state.newPass.error)
    const success = useSelector<AppRootStateType, boolean>(state => state.newPass.success)


    const formik = useFormik({
        initialValues: {
            password: '',
            password2: ''
        },
        validate: (values) => {
            const errors: Partial<FormikErrorNewPasswordType> = {};
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 8) {
                errors.password = 'Invalid email address';
            }
            if (!values.password2) {
                errors.password2 = 'Required';
            } else if (values.password.length < 8) {
                errors.password2 = 'Invalid email address';
            }
            return errors
        },
        onSubmit: values => {
            if (token) {
                dispatch(setPassword(token, values.password, values.password2))
            }
            formik.resetForm()
        },
    })

    if (success) {
        return <Navigate to={'/login'}/>
    }

    return (
        <ContainerAuth>
            <div className={styles.container}>

                <div className={styles.intro}>
                    <h1>It-incubator</h1>
                    <h3>Create new password?</h3>
                </div>

                <form onSubmit={formik.handleSubmit}>
                    <div className={styles.inputBox}>
                        <label>New Password</label>
                        <SuperInputText
                            type='password'
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password
                            && formik.errors.password
                            && <div style={{color: 'red'}}>{formik.errors.password}</div>}
                    </div>
                    <div className={styles.inputBox}>
                        <label>Repeat Password</label>
                        <SuperInputText
                            type='password'
                            {...formik.getFieldProps('password2')}
                        />
                        {formik.touched.password2
                            && formik.errors.password2
                            &&
                            <div style={{color: 'red'}}>{formik.errors.password2}</div>}
                    </div>

                    <div style={{color: 'red'}}>{error}</div>

                    <div className={styles.message}>Create new password and will send you further instructions to email</div>

                    <div className={styles.buttonContainer}>
                        <SuperButton className={styles.buttonBox} type={'submit'}>Create
                            new password</SuperButton>
                    </div>
                </form>
            </div>
        </ContainerAuth>
    )
}