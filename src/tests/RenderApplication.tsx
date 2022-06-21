import {act} from 'react-dom/test-utils'
import {render} from '@testing-library/react'
import '@testing-library/jest-dom'
import {BrowserRouter} from 'react-router-dom'
import App, {AppProps} from '../App'
import React from 'react'

export default async function renderApplication(
    url: string, appProps: AppProps
) {
    await act(async () => {
        window.history.pushState({}, '', url)
        render(
            <BrowserRouter>
                <App {...appProps}/>
            </BrowserRouter>
        )
    })
}
