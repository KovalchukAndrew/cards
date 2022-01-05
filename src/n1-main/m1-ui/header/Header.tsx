import React from "react";
import s from './Header.module.scss'
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../m2-bll/store";
import {logoutTC} from "../../../n2-features/f1-auth/a1-login/loginReducer";

export const Header = () => {
    const inAuth = useSelector<AppRootStateType, boolean>((state) => state.app.inAuth)
    const dispatch = useDispatch()
    const logout = () => inAuth && dispatch(logoutTC())

    return (
        <div className={s.headerContainer}>
            <nav className={s.navigate}>
                <Link to={'/login'} onClick={logout}>{inAuth ? 'Log Out' : 'Log In'}</Link>
                {!inAuth && <Link to={'/register'}>{'Sing Up'}</Link>}
                {/*<Link to={'/profile'}>Profile</Link>*/}
            </nav>
        </div>
    )
}