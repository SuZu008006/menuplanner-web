import React from 'react'
import {Route, Routes} from 'react-router-dom'
import MenuListScreen from './MenuListScreen'
import {MenuDetailScreen} from './MenuDetailScreen'
import MenuRepo from './NetworkMenuRepo'

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
                <Route path="/menuDetail/:menuCode" element={<MenuDetailScreen menuRepo={menuRepo}/>}/>
            </Routes>
        </>
    )
}