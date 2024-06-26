import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {PathContextProvider} from "./contexts/PathContext";
import {Settings} from "./components/Settings";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <PathContextProvider>
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<App/>}/>
                <Route exact path="/settings" element={<Settings/>}/>
            </Routes>
        </BrowserRouter>
    </PathContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
