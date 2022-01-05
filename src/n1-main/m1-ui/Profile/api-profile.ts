import axios from 'axios';
import {serverAPI} from "../common/helpers/findServer";

const instance = {
    baseURL: serverAPI,
    withCredentials: true
};

const axiosInstance = axios.create(instance);

export const profileAPI = {
    changeUserName: (data: ProfileType) => {
        return axiosInstance.put("auth/me", data)
    },
    getCards: (getParamsCards: getParamsType) => {
        return axiosInstance.get("cards/pack", {params: getParamsCards})
    },
    addNewPack: (data: getParamsNewPackType) => {
        return axiosInstance.post("/cards/pack", data)
    },
    deleteCardPack: (id: string) => {
        return axiosInstance.delete(`cards/pack?id=${id}`)
    },
    updateCardPack: (data: getParamsNewPackType) => {
        return axiosInstance.put(`cards/pack`, data)
    }
};

export type getParamsNewPackType = {
    cardsPack: cardsPackType
}

export type cardsPackType = {
    name?: string
    path?: string
    grade?: number
    shots?: number
    rating?: number
    deckCover?: string
    private?: boolean
    type?: string
    _id?: string
}

export type getParamsType = {
    packName?: string,
    min?: number,
    max?: number,
    sortPacks?: number | string,
    page?: number,
    pageCount?: number,
    user_id?: string,
}

export type ProfileType = {
    name: string
    avatar?: string
}

export default profileAPI;