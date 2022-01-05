import axios from "axios";
import {serverAPI} from "./common/helpers/findServer";

const instance = axios.create({
    baseURL: serverAPI,
    withCredentials: true,
})

export const authApi = {
    inAuth() {
        return instance.post('auth/me', {})
    },
}