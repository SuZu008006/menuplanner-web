import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import App, {AppProps} from './App'

export default function AppNavigation(props: { appProps: AppProps }) {
    return (
        <BrowserRouter>
            <App {...props.appProps}/>
        </BrowserRouter>
    )
}
