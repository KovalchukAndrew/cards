import {inLoginType, loginApi} from "./api";
import {Dispatch} from "redux";
import {SetInAuth, setIsLoading} from "../../../n1-main/m1-ui/appReducer";
import {changeUserNameAC} from "../../../n1-main/m1-ui/Profile/profileReducer";

const initialState = {
    error: '',
    profileData: {} as ProfileDataType
}

export const loginReducer = (state: LoginInitialStateType = initialState, action: ActionType): LoginInitialStateType => {
    switch (action.type) {
        case "SET_ERROR":
            return {
                ...state, error: action.error
            }
        case "SET_PROFILE_DATA":
            return {
                ...state, profileData: {...action.data}
            }

        default:
            return state
    }
}

// actions
export const setError = (error: string) => ({type: 'SET_ERROR', error} as const)
export const setProfileData = (data: ProfileDataType) => ({type: 'SET_PROFILE_DATA', data} as const)

//thunk logout
export const inLoginTC = (data: inLoginType) => async (dispatch: Dispatch) => {
    dispatch(setIsLoading('loading'))

    try {
        const res = await loginApi.inLogin(data)
        dispatch(setIsLoading('idle'))
        dispatch(setError(''))
        dispatch(SetInAuth(true))
        dispatch(changeUserNameAC(res.data.name))
        dispatch(setProfileData(res.data))
    } catch (err: any) {
        dispatch(setIsLoading('error'))
        dispatch(setError(err.response.data.error))
    }
}

export const logoutTC = () => async (dispatch: Dispatch) => {
    dispatch(setIsLoading('loading'))

    try {
        await loginApi.logout()
        dispatch(setIsLoading('idle'))
        dispatch(SetInAuth(false))
        dispatch(setProfileData(initialState.profileData))
    } catch (err) {
        dispatch(setIsLoading('error'))
    }
}

// type
export type LoginInitialStateType = {
    error: string
    profileData: ProfileDataType
}

type ActionType = ReturnType<typeof setError> | ReturnType<typeof setProfileData>

export type ProfileDataType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean;
    rememberMe: boolean;
    error?: string;
}