import axios, {AxiosResponse} from 'axios'


const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const recoveryAPI = {
    forgot(data: ForgotParamsType) {
        return instance.post<ForgotParamsType, AxiosResponse<ResponseForgotType>>('auth/forgot', data)
    }
}

// type
export type ResponseForgotType = {
    info: string
    error: string
}

export type FormikErrorRecoveryType = {
    email: string
}

export type ForgotParamsType = FormikErrorRecoveryType & {
    from: string
    message: string
}