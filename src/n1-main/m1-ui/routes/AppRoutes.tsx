import React from "react";
import {Route, Routes} from "react-router-dom";
import {NotFound} from "../common/c4-NotFound/NotFound";
import {NewPassword} from "../../NewPassword/NewPassword";
import {Profile} from "../Profile/Profile";
import {TestComponent} from "../../../n2-features/f0-test/TestComponent";
import {Login} from "../../../n2-features/f1-auth/a1-login/Login";
import {Registration} from "../../../n2-features/f1-auth/a2-register/Registration";
import {
    ForgetPassword
} from "../../../n2-features/f1-auth/a3-forget/f1-ui/ForgetPassword";
import {CheckEmail} from "../../../n2-features/f1-auth/a3-forget/f1-ui/CheckEmail";
import {CardsContainer} from "../../../n2-features/f2-cards/c1-ui/CardsContainer";
import Learn from "../../../n2-features/f3-learn/learn";


export const AppRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Profile/>}/>
                <Route path='login' element={<Login/>}/>
                <Route path='register' element={<Registration/>}/>
                <Route path='recovery' element={<ForgetPassword/>}/>
                <Route path='check-email' element={<CheckEmail/>}/>
                <Route path='new-pass/:token' element={<NewPassword/>}/>
                <Route path='profile' element={<Profile/>}/>
                <Route path='*' element={<NotFound/>}/>
                <Route path='test' element={<TestComponent/>}/>
                <Route path='cards/:id' element={<CardsContainer/>}/>
                <Route path='learn/:id' element={<Learn/>}/>
            </Routes>
        </div>
    )
}