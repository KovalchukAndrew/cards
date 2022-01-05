import styles from './styles.module.scss'
import SuperInputText from "../../../n1-main/m1-ui/common/c2-SuperInputText/SuperInputText";
import SuperButton from "../../../n1-main/m1-ui/common/c1-SuperButton/SuperButton";
import {FormikProps, useFormik} from "formik";
import {inLoginTC} from "./loginReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../n1-main/m2-bll/store";
import {Navigate, useNavigate} from 'react-router-dom';
import SuperCheckbox from "../../../n1-main/m1-ui/common/c3-SuperCheckbox/SuperCheckbox";
import ContainerAuth from '../../../n1-main/m1-ui/common/c4-containerAuth';

export const Login = () => {
    const dispatch = useDispatch()
    const error = useSelector<AppRootStateType, string>((state) => state.login.error)
    const inAuth = useSelector<AppRootStateType, boolean>((state) => state.app.inAuth)
    const navigate = useNavigate()

    type FormikTypes = {
        email: string
        password: string
        rememberMe: boolean
    }

    const formik: FormikProps<FormikTypes> = useFormik<FormikTypes>({
        initialValues: {
            email: '',
            password: '',
            rememberMe: true
        },
        onSubmit: (values) => {
            dispatch(inLoginTC({email: values.email, password: values.password, rememberMe: values.rememberMe}))
            console.log(values)
        }
    })

    if (inAuth) return <Navigate to={'/profile'}/>

    return (
        <ContainerAuth>

            <div className={styles.login}>

                <div className={styles.intro}>
                    <h1>It-incubator</h1>
                    <h3> Sign In</h3>
                </div>

                <form autoComplete="off" onSubmit={formik.handleSubmit}>
                    <div className={styles.inputs}>
                        <div className={styles.inputsBox}>
                            <label className={styles.label}>Email</label>
                            <SuperInputText name={'email'} className={styles.input}
                                            onChange={formik.handleChange}
                                            value={formik.values.email}/>
                        </div>
                        <div className={styles.inputsBox}>
                            <label className={styles.label}>Password</label>
                            <SuperInputText name={'password'} type={'password'} className={styles.input}
                                            onChange={formik.handleChange}
                                            value={formik.values.password}/>
                        </div>
                        <div className={styles.remember}>
                            <span>Remember me</span>
                            <SuperCheckbox onChange={formik.handleChange}
                                           checked={formik.values.rememberMe}
                                           name={'rememberMe'}/>
                        </div>
                        <span className={styles.error}>
                                {error}
                            </span>
                        <div className={styles.forgot}>

                            <p onClick={() => navigate('/recovery')}>
                                Forgot Password
                            </p>
                        </div>
                    </div>

                    <div className={styles.next}>
                        <SuperButton type={'submit'} className={styles.btn}>Login</SuperButton>
                        <span className={styles.notAccount}>
                            Don’t have an account?
                        </span>
                        <p className={styles.singUp} onClick={() => navigate('/register')}>
                            Sing Up
                        </p>
                    </div>
                </form>

            </div>
        </ContainerAuth>
    )
}