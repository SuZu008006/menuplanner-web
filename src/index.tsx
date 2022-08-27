import React from 'react'
// import {createRoot} from 'react-dom/client'
import {render} from 'react-dom'
import AppNavigation from './AppNavigation'
import {AppPropsBuilder} from './AppPropsBuilder'

const appProps = new AppPropsBuilder().build()

const container = document.getElementById('root')
if (container) {
    // const root = createRoot(container)
    const root = document.getElementById('root')
    render(
        <AppNavigation appProps={appProps}/>,
        root
    )
}
