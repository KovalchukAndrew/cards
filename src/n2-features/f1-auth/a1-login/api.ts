import axios from "axios";
import {serverAPI} from "../../../n1-main/m1-ui/common/helpers/findServer";

const instance = axios.create({
    baseURL: serverAPI,
    withCredentials: true,
})

export const loginApi = {
    inLogin(data: inLoginType) {
        return instance.post('auth/login', data)
    },
    logout() {
        return instance.delete('auth/me')
    }
}

export type inLoginType = {
    email: string
    password: string
    rememberMe?: boolean
}