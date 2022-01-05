import axios from 'axios';
import {serverAPI} from "../../../n1-main/m1-ui/common/helpers/findServer";

const instance = {
    baseURL: serverAPI,
};

const axiosInstance = axios.create(instance);

export const registrationAPI = {
    registration: (data: RegistrationType) => {
        return axiosInstance.post("auth/register", data)
    },
};

export type RegistrationType = {
    email: string
    password: string
}


export default registrationAPI;