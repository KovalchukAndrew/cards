import {Dispatch} from "redux";
import {newPasswordAPI} from "./newPasswordAPI";
import {setIsLoading} from "../m1-ui/appReducer";

const initialState = {
    error: '',
    success: false
}

export const newPassReducer = (state: NewPassInitialStateType = initialState, action: NewPassActionType) => {
    switch (action.type) {
        case "SET-ERROR":
            return {
                ...state,
                error: action.message
            }
        case "SET-SUCCESS":
            return {
                ...state,
                success: action.value
            }
        default:
            return state
    }
}

// actions
export const setError = (message: string) => ({type: 'SET-ERROR', message} as const)
export const setSuccess = (value: boolean) => ({type: 'SET-SUCCESS', value} as const)

// thunk
export const setPassword = (token: string, password: string, password2: string) => (dispatch: Dispatch) => {
    if (password !== password2) {
        dispatch(setError("Passwords don't match!"))
    } else {
        dispatch(setIsLoading('loading'))
        newPasswordAPI.setNewPassword(password, token)
            .then(res => {
                dispatch(setIsLoading('idle'))
                dispatch(setSuccess(true))
            })
            .catch(err => {
                dispatch(setIsLoading('error'))
                console.log(err.response.data.error)
            })
    }

}

// type
export type NewPassInitialStateType = typeof initialState
export type NewPassActionType =
    ReturnType<typeof setError>
    | ReturnType<typeof setSuccess>