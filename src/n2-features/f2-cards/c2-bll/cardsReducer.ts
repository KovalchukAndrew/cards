import {Dispatch} from "redux";
import {AppRootStateType} from "../../../n1-main/m2-bll/store";
import {setIsLoading} from "../../../n1-main/m1-ui/appReducer";
import {cardsAPI} from "../c3-dall/api-cards";

const initialState = {
    cards: null as (null | GetCardsType),
    sortByCards: 0 as (0 | 1),
    sortName: "updated",
    searchName: "",
    page: 1,
    pageCount: 9,
}

export const cardsReducer = (state: CardsInitialStateType = initialState, action: CardsActionType): CardsInitialStateType => {
    switch (action.type) {
        case "CARDS/SET-CARDS":
            return {
                ...state,
                cards: action.cards
            }
        case "CARDS/CHANGE_SORT_CARDS":
            return {
                ...state, sortByCards: action.sort, sortName: action.sortName
            }
        case "CARDS/CHANGE-SEARCH-NAME":
            return {
                ...state,
                searchName: action.value
            }
        case "CARDS/SET-PAGE":
            return {
                ...state,
                page: action.newPage
            }
        case "CARDS/SET-ROWS-PER-PAGE":
            return {
                ...state,
                pageCount: action.value
            }
        default:
            return state
    }
}

// actions
export const setCards = (cards: GetCardsType) => ({type: 'CARDS/SET-CARDS', cards} as const)
export const setChangeSortCards = (sort: 0 | 1, sortName: string) => ({
    type: 'CARDS/CHANGE_SORT_CARDS',
    sort,
    sortName
} as const)
export const changeSearchName = (value: string) => ({type: 'CARDS/CHANGE-SEARCH-NAME', value} as const)
export const setPage = (newPage: number) => ({type: 'CARDS/SET-PAGE', newPage} as const)
export const setRowsPerPage = (value: number) => ({type: 'CARDS/SET-ROWS-PER-PAGE', value} as const)


//thunk
export const getCards = (cardsPack_id: string | undefined) => async (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const state = getState()
    const {sortName, sortByCards, page, pageCount} = state.cards
    const cardAnswer = state.cards.searchName
    dispatch(setIsLoading('loading'))
    try {
        dispatch(setIsLoading('idle'))
        const res = await cardsAPI.getCards({
            pageCount,
            page,
            cardAnswer,
            cardsPack_id,
            sortCards: sortByCards + sortName
        })
        dispatch(setCards(res.data))
    } catch (e) {
        dispatch(setIsLoading('error'))
    }
}

export const addCardTC = (cardsPack_id: string | undefined, answer: string | undefined, question: string | undefined) => async (dispatch: Dispatch) => {
    dispatch(setIsLoading('loading'))
    try {
        await cardsAPI.addNewCard({card: {cardsPack_id, answer: answer, question: question}})
        dispatch(setIsLoading('idle'))
    } catch (e) {
        dispatch(setIsLoading('error'))
    }
}

export const deleteCardItemTC = (id: string) => async (dispatch: Dispatch) => {
    dispatch(setIsLoading('loading'))
    try {
        await cardsAPI.deleteCardItem(id)
        dispatch(setIsLoading('idle'))
    } catch (e) {
        dispatch(setIsLoading('error'))
    }
}

export const updateCardItemTC = (value: string, id: string) => async (dispatch: Dispatch) => {
    dispatch(setIsLoading('loading'))
    try {
        await cardsAPI.updateCardItem(value, id)
        dispatch(setIsLoading('idle'))
    } catch (e) {
        dispatch(setIsLoading('error'))
    }
}
export const getLearnCards = (cardsPack_id: string | undefined) => async (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const state = getState()
    const pageCount = 1000
    dispatch(setIsLoading('loading'))
    try {
        dispatch(setIsLoading('idle'))
        const res = await cardsAPI.getLearnCards({cardsPack_id, pageCount})
        dispatch(setCards(res.data))
    } catch (e) {
        dispatch(setIsLoading('error'))
    }
}
export const rateCardTC = (grade: number, card_id: string) => async (dispatch: Dispatch) => {
    try {
        const res = await cardsAPI.rateCard(grade, card_id)
        console.log(res.data)
    }catch (e) {

    }
}

// type
type CardsInitialStateType = typeof initialState
export type GetCardsType = {
    cards: [CardType]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}
export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    rating: number
    shots: number
    type: string
    user_id: string
    created: string
    updated: string
    __v: number
    _id: string
}

type CardsActionType =
    | ReturnType<typeof setCards>
    | ReturnType<typeof setChangeSortCards>
    | ReturnType<typeof changeSearchName>
    | ReturnType<typeof setPage>
    | ReturnType<typeof setRowsPerPage>
