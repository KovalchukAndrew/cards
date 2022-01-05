import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
})


export const newPasswordAPI = {
    setNewPassword(password: string, resetPasswordToken: string) {
        return instance.post<NewPasswordParamsType, AxiosResponse<ResponseNewPasswordType>>('/auth/set-new-password', {password, resetPasswordToken})
    }
}

// type
export type FormikErrorNewPasswordType = {
    password: string
    password2: string
}
type NewPasswordParamsType = {
    password: string
    resetPasswordToken: string
}
type ResponseNewPasswordType = {
    info: string
    error: string
}