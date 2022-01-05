import React from 'react';
import './App.scss';
import {HashRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {Main} from "../Main";
import {store} from "../m2-bll/store";
import {serverAPI} from "./common/helpers/findServer";

const App = () => {
    console.log(`use ${serverAPI}`)
    return (
        <div className="App">
            <HashRouter>
                <Provider store={store}>
                    <Main/>
                </Provider>
            </HashRouter>
        </div>
    );
}

export default App;
