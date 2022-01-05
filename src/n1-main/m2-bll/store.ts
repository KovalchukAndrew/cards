import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk'
import {loginReducer} from "../../n2-features/f1-auth/a1-login/loginReducer";
import {registerReducer} from "../../n2-features/f1-auth/a2-register/registerReducer";
import {recoveryReducer} from "../../n2-features/f1-auth/a3-forget/f2-bll/recoveryReducer";
import {newPassReducer} from "../NewPassword/newPassReducer";
import {profileReducer} from "../m1-ui/Profile/profileReducer";
import {appReducer} from "../m1-ui/appReducer";
import {cardsReducer} from "../../n2-features/f2-cards/c2-bll/cardsReducer";


const rootReducer = combineReducers({
    login: loginReducer,
    register: registerReducer,
    recovery: recoveryReducer,
    newPass: newPassReducer,
    profile: profileReducer,
    app: appReducer,
    cards: cardsReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

// type
export type AppRootStateType = ReturnType<typeof rootReducer>
