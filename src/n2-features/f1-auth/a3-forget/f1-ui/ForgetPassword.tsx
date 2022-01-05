import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import SuperInputText
    from "../../../../n1-main/m1-ui/common/c2-SuperInputText/SuperInputText";
import SuperButton from "../../../../n1-main/m1-ui/common/c1-SuperButton/SuperButton";
import {forgotPassword} from "../f2-bll/recoveryReducer";
import {FormikErrorRecoveryType} from "../f3-dall/recoveryAPI";
import {Navigate, useNavigate} from "react-router-dom";
import {AppRootStateType} from "../../../../n1-main/m2-bll/store";
import ContainerAuth from "../../../../n1-main/m1-ui/common/c4-containerAuth";
import styles from './ForgetPassword.module.scss'

export const ForgetPassword = () => {
    const dispatch = useDispatch()
    const isSuccess = useSelector<AppRootStateType, boolean>(state => state.recovery.isSuccess)
    const error = useSelector<AppRootStateType, string>(state => state.recovery.error)
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validate: (values) => {
            const errors: Partial<FormikErrorRecoveryType> = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            return errors
        },
        onSubmit: values => {
            dispatch(forgotPassword(values.email))
            formik.resetForm()
        },
    })

    if (isSuccess) {
        return <Navigate to={'/check-email'}/>
    }
    return (
        <ContainerAuth>
            <div className={styles.container}>

                <div className={styles.intro}>
                    <h1>It-incubator</h1>
                    <h3>Forgot your password?</h3>
                </div>

                <form onSubmit={formik.handleSubmit}>
                    <div className={styles.inputBox}>
                        <label>Email</label>
                        <SuperInputText
                            type='email'
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email
                            && formik.errors.email
                            && <div style={{color: 'red'}}>{formik.errors.email}</div>}
                        <div style={{color: 'red'}}>{error}</div>
                    </div>
                    <div className={styles.message}>Enter your email address and will send you further instructions</div>
                    <div className={styles.buttonContainer}>
                        <SuperButton className={styles.buttonBox} type={'submit'}>
                            Send Instructions
                        </SuperButton>
                        <span className={styles.remember}>Did you remember your password?</span>
                        <span className={styles.tryLoggingIn} onClick={() => navigate('/login')}>Try logging in</span>
                    </div>

                </form>
            </div>
        </ContainerAuth>
    )
}