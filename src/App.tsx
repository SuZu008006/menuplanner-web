import React from 'react'
import {Route, Routes} from 'react-router-dom'
import MenuListScreen from './MenuListScreen'
import MenuDetailScreen from './MenuDetailScreen'
import MenuSummaryScreen from './MenuSummaryScreen'
import MenuRepo from './NetworkMenuRepo'
import styles from './styles/App.module.scss'

export interface AppProps {
    menuRepo: MenuRepo,
}

export default function App(props: AppProps) {
    const {menuRepo} = props
    return (
        <>
            <header className="App-header">
                <div className={styles.appTitle}>
                    menu planner
                </div>
            </header>
            <div className="App">
            </div>
            <Routes>
                <Route path="/" element={<></>}/>
                <Route path="/menuList" element={<MenuListScreen menuRepo={menuRepo}/>}/>
                <Route path="/menuDetail/:menuCode" element={<MenuDetailScreen menuRepo={menuRepo}/>}/>
                <Route path="/menuSummary" element={<MenuSummaryScreen menuRepo={menuRepo}/>}/>
            </Routes>
        </>
    )
}