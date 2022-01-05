import axios from 'axios';
import {serverAPI} from "../../../n1-main/m1-ui/common/helpers/findServer";

const instance = {
    baseURL: serverAPI,
    withCredentials: true
};

const axiosInstance = axios.create(instance);

export const cardsAPI = {
    getCards: (getParamsCards: getParamsCardsType) => {
        return axiosInstance.get("cards/card", {params: getParamsCards})
    },
    getLearnCards: (getParamsCards: getParamsCardsType) => {
        return axiosInstance.get("cards/card", {params: getParamsCards})
    },
    addNewCard: (data: getParamsNewCardType) => {
        return axiosInstance.post("cards/card", data)
    },
    deleteCardItem: (id: string) => {
        return axiosInstance.delete(`cards/card?id=${id}`)
    },
    updateCardItem: (value: string, _id: string) => {
        return axiosInstance.put('cards/card', {card: {question: value, _id: _id}})
    },
    rateCard: (grade: number, card_id: string) => {
        return axiosInstance.put("cards/grade", {grade, card_id})
    }
};

// type
export type getParamsNewCardType = {
    card: CardType
}
export type CardType = {
    cardsPack_id: string | undefined
    question?: string
    answer?: string
    grade?: number
    shots?: number
    rating?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
    type?: string
}

export type getParamsCardsType = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id: string | undefined
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
}
