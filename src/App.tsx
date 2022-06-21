import React from 'react'
import MenuRepo from './NetworkMenuRepo'
import {Route, Routes} from 'react-router-dom'
import MenuListScreen from './MenuListScreen'

export interface AppProps {
    menuRepo: MenuRepo,
}

export default function App(props: AppProps) {
    const {menuRepo} = props
    return (
        <>
            <header className="App-header">
            </header>
            <div className="App">
            </div>
            <Routes>
                <Route path="/menuList" element={<MenuListScreen menuRepo={menuRepo}/>}/>
            </Routes>
        </>
    )
}