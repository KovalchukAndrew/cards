import {Header} from "./m1-ui/header/Header";
import {AppRoutes} from "./m1-ui/routes/AppRoutes";
import PreLoader from "./m1-ui/common/c5-loader";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./m2-bll/store";
import {inAuthTC, IsLoadingType} from "./m1-ui/appReducer";

export const Main = () => {
    const isLoading = useSelector<AppRootStateType, IsLoadingType>((state) => state.app.isLoading)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(inAuthTC())
    }, [dispatch])
    return (
        <>
            <Header/>
            {isLoading === 'loading' && <PreLoader/>}
            {isLoading !== 'loading' && <AppRoutes/>}
        </>


    )
}