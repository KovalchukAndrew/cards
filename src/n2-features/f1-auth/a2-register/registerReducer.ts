import registrationAPI, {RegistrationType} from "./api-registration";
import {Dispatch} from "redux";
import {setIsLoading} from "../../../n1-main/m1-ui/appReducer";

const initialState = {
    isRegistrate: false,
    errorRegist: "",
}

export const registerReducer = (state: RegisterInitialStateType = initialState, action: RegisterActionType): RegisterInitialStateType => {
    switch (action.type) {
        case "REGISTRATION":
            return {
                ...state, isRegistrate: action.isRegistrate
            }
        case "REGISTRATION/SET_ERROR":
            return {
                ...state, errorRegist: action.errorRegist
            }
        default:
            return state
    }
}

export const registrateAC = (isRegistrate: boolean) => ({type: 'REGISTRATION', isRegistrate} as const)
export const setErrorAC = (errorRegist: string) => ({type: 'REGISTRATION/SET_ERROR', errorRegist} as const)

export const registrateTC = (data: RegistrationType) => (dispatch: Dispatch<RegisterActionType>) => {
dispatch(setIsLoading('loading'))
    registrationAPI.registration(data)
        .then((res) => {
            dispatch(registrateAC(true))
            dispatch(setIsLoading('idle'))
            dispatch(setErrorAC(""))
        })
        .catch(error => {
            dispatch(registrateAC(false))
            dispatch(setIsLoading('error'))
            dispatch(setErrorAC(error.response.data.error))
            setTimeout(() => {
                dispatch(setErrorAC(""))
            }, 6000)
        })
}

// type
export type RegisterInitialStateType = typeof initialState
type SetErrorActionType = ReturnType<typeof setErrorAC>

export type RegisterActionType = ReturnType<typeof registrateAC>
| ReturnType<typeof setIsLoading>
| SetErrorActionType