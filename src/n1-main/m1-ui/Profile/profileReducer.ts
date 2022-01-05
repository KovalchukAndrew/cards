import profileAPI, {getParamsNewPackType, ProfileType} from "./api-profile";
import {setIsLoading} from "../appReducer";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../m2-bll/store";

const initialState = {
    name: "user name",
    avatar: "https://cdn-icons-png.flaticon.com/512/4530/4530930.png",
    cards: null as (null | GetCardsType),
    sortName: 'updated',
    sortCards: 0 as (0 | 1),
    packName: "",
    newCard: {},
    page: 1,
    pageCount: 9,
    min: 0,
    max: 110,
    user_id: ""
}

export const profileReducer = (state: ProfileInitialStateType = initialState, action: ProfileActionType): ProfileInitialStateType => {
    switch (action.type) {
        case "PROFILE/CHANGE_USER_NAME":
            return {
                ...state, name: action.userName
            }
        case "PROFILE/SET_CARDS":
            return {
                ...state, cards: action.cards
            }
        case "PROFILE/CHANGE_SORT_CARDS":
            return {
                ...state, sortCards: action.sort, sortName: action.sortName
            }
        case "PROFILE/CHANGE-PACK-NAME":
            return {
                ...state, packName: action.value
            }
        case "PROFILE/SET-PAGE":
            return {
                ...state,
                page: action.newPage
            }
        case "PROFILE/SET-ROWS-PER-PAGE":
            return {
                ...state,
                pageCount: action.value
            }
        case "PROFILE/SET_CARDS_NUMBER":
            return {
                ...state, min: action.min, max: action.max
            }
        case "PROFILE/SET_CARDS_BY_ID":
            return {
                ...state, user_id: action.user_id
            }
        default:
            return state
    }
}

// actions
export const changeUserNameAC = (userName: string) => ({type: 'PROFILE/CHANGE_USER_NAME', userName} as const)
export const setCards = (cards: GetCardsType) => ({type: 'PROFILE/SET_CARDS', cards} as const)
export const setChangeSortCards = (sort: 0 | 1, sortName: string) => ({
    type: 'PROFILE/CHANGE_SORT_CARDS',
    sort,
    sortName
} as const)
export const changePackName = (value: string) => ({type: 'PROFILE/CHANGE-PACK-NAME', value} as const)
export const addPack = (newPack: CardType) => ({type: 'PROFILE/ADD-PACK', newPack} as const)
export const setPage = (newPage: number) => ({type: 'PROFILE/SET-PAGE', newPage} as const)
export const setRowsPerPage = (value: number) => ({type: 'PROFILE/SET-ROWS-PER-PAGE', value} as const)

export const setChangeCardsNumber = (min: number, max: number) => ({
    type: 'PROFILE/SET_CARDS_NUMBER',
    min,
    max
} as const)
export const setChangeSortCardsById = (user_id: string) => ({type: 'PROFILE/SET_CARDS_BY_ID', user_id} as const)

//thunk
export const changeUserNameTC = (data: ProfileType) => (dispatch: Dispatch) => {
    dispatch(setIsLoading('loading'))

    profileAPI.changeUserName(data)
        .then((res) => {
            dispatch(changeUserNameAC(res.data.updatedUser.name))
            dispatch(setIsLoading('idle'))
        })
        .catch(() => {
            dispatch(setIsLoading('error'))
        })
}

export const getCardsPack = () => async (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const state = getState()
    const {packName, page, pageCount, sortCards, sortName, min, max, user_id} = state.profile
    dispatch(setIsLoading('loading'))

    try {
        dispatch(setIsLoading('idle'))
        const res = await profileAPI.getCards({
            pageCount,
            page,
            packName,
            sortPacks: sortCards + sortName,
            min,
            max,
            user_id
        })
        dispatch(setCards(res.data))
    } catch (e) {
        dispatch(setIsLoading('error'))
    }
}
export const addCardPack = (name?: string) => async (dispatch: Dispatch) => {
    dispatch(setIsLoading('loading'))

    try {
        await profileAPI.addNewPack({cardsPack: {name}})
        dispatch(setIsLoading('idle'))
    } catch (e) {
        dispatch(setIsLoading('error'))
    }
}

export const deleteCardPackTC = (id: string) => async (dispatch: Dispatch) => {
    dispatch(setIsLoading('loading'))

    try {
        await profileAPI.deleteCardPack(id)
        dispatch(setIsLoading('idle'))
    } catch (e) {
        dispatch(setIsLoading('error'))
    }
}

export const updateCardPackTC = (data: getParamsNewPackType) => async (dispatch: Dispatch) => {
    dispatch(setIsLoading('loading'))

    try {
        await profileAPI.updateCardPack(data)
        dispatch(setIsLoading('idle'))

    } catch (e) {
        dispatch(setIsLoading('error'))
    }
}
// type
type ProfileInitialStateType = typeof initialState
export type GetCardsType = {
    cardPacks: [
        CardType
    ]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}
export type CardType = {
    cardsCount: number
    created: string
    grade: number
    more_id: string
    name: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
}

type ChangeUserNameActionType = ReturnType<typeof changeUserNameAC>
type ProfileActionType =
    ChangeUserNameActionType
    | ReturnType<typeof setIsLoading>
    | ReturnType<typeof setCards>
    | ReturnType<typeof setChangeSortCards>
    | ReturnType<typeof changePackName>
    | ReturnType<typeof addPack>
    | ReturnType<typeof setPage>
    | ReturnType<typeof setRowsPerPage>
    | ReturnType<typeof setChangeCardsNumber>
    | ReturnType<typeof setChangeSortCardsById>
