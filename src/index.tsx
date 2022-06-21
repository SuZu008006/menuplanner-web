import React from 'react'
import ReactDOM from 'react-dom'
import AppNavigation from './AppNavigation'
import {AppPropsBuilder} from './AppPropsBuilder'

const appProps = new AppPropsBuilder().build()

ReactDOM.render(
    <AppNavigation appProps={appProps}/>,
    document.getElementById('root')
)
