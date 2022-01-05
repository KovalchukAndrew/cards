import {Dispatch} from "redux";
import {authApi} from "./apiApp";
import {changeUserNameAC} from "./Profile/profileReducer";
import {setProfileData} from "../../n2-features/f1-auth/a1-login/loginReducer";

const initialState = {
    isLoading: 'loading' as IsLoadingType,
    inAuth: false,
}

export const appReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "APP/IS_LOADING":
            return {...state, isLoading: action.isLoading}

        case "APP/IN_AUTH":
            return {...state, inAuth: action.inAuth}

        default:
            return state
    }
}

//action creator
export const setIsLoading = (isLoading: IsLoadingType) => ({type: 'APP/IS_LOADING', isLoading} as const)
export const SetInAuth = (inAuth: boolean) => ({type: 'APP/IN_AUTH', inAuth} as const)

//thunk
export const inAuthTC = () => async (dispatch: Dispatch) => {
    dispatch(setIsLoading('loading'))
    try {
        const res = await authApi.inAuth()
        dispatch(SetInAuth(true))
        dispatch(changeUserNameAC(res.data.name))
        dispatch(setProfileData(res.data))
        dispatch(setIsLoading('idle'))
    } catch (err) {
        dispatch(SetInAuth(false))
        dispatch(setIsLoading('error'))
    }
}


//types
export type IsLoadingType = 'idle' | 'loading' | 'success' | 'error'

type InitialStateType = typeof initialState
type ActionType = ReturnType<typeof setIsLoading>
    | ReturnType<typeof SetInAuth>
    | ReturnType<typeof changeUserNameAC>