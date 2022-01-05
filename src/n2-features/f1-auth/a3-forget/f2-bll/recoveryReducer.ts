import {Dispatch} from "redux";
import {recoveryAPI} from "../f3-dall/recoveryAPI";
import {setIsLoading} from "../../../../n1-main/m1-ui/appReducer";

const initialState = {
    isSuccess: false,
    email: '',
    error: '',
}

export const recoveryReducer = (state: RecoveryInitialStateType = initialState, action: RecoveryActionType) => {
    switch (action.type) {
        case "FORGOT-PASSWORD":
            return {
                ...state,
                isSuccess: action.value,
                email: action.email
            }
        case "SET-ERROR":
            return {
                ...state,
                error: action.err
            }
        default:
            return state
    }
}

// actions
export const setIsSuccessAndSetEmail = (value: boolean, email: string) => ({type: 'FORGOT-PASSWORD', value, email} as const)
export const setError = (err: string) => ({type: 'SET-ERROR', err} as const)

// thunks
export const forgotPassword = (email: string) => (dispatch: Dispatch) => {
    const data = {
        email: email,
        from: 'test-front-admin <ev.drozd.2020@gmail.com>',
        message: `<div style="background-color: #8865c0; padding: 15px">password recovery link: <a href='https://evgeniy-92.github.io/cards-2-0/#/new-pass/$token$'>link</a></div>`,
    }

    dispatch(setIsLoading('loading'))

    recoveryAPI.forgot(data)
        .then(res => {
            dispatch(setIsLoading('idle'))
            dispatch(setIsSuccessAndSetEmail(true, email))
        })
        .catch(err => {
            dispatch(setIsLoading('error'))
            dispatch(setError(err.response.data.error))
        })
}


// type
export type RecoveryInitialStateType = typeof initialState
export type RecoveryActionType =
    | ReturnType<typeof setIsSuccessAndSetEmail>
    | ReturnType<typeof setError>