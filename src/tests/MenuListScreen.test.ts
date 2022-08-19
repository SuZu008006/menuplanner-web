import '@testing-library/jest-dom'
import renderApplication from './RenderApplication'
import Menu from '../Menu'
import {AppProps} from '../App'
import {AppPropsBuilder} from '../AppPropsBuilder'
import {screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {SpyStubMenuRepo} from './SpyStubMenuRepo'

describe('menu list screen', () => {
    let spyStubMenuRepo: SpyStubMenuRepo
    let appProps: AppProps

    beforeEach(() => {
        spyStubMenuRepo = new SpyStubMenuRepo()
        appProps = new AppPropsBuilder()
            .withMenuRepo(spyStubMenuRepo)
            .build()
    })

    test('display the menu list around week', async () => {
        const menuResult: Menu[] = [
            {id: '1', title: 'title1'},
            {id: '2', title: 'title2'},
            {id: '3', title: 'title3'},
            {id: '4', title: 'title4'},
            {id: '5', title: 'title5'},
            {id: '6', title: 'title6'},
            {id: '7', title: 'title7'},
        ]
        spyStubMenuRepo.menu_returnValue = Promise.resolve(menuResult)


        await renderApplication('/menuList', appProps)


        expect(screen.getByText('月')).toBeInTheDocument()
        expect(screen.getByText('title1')).toBeInTheDocument()
        expect(screen.getByText('火')).toBeInTheDocument()
        expect(screen.getByText('title2')).toBeInTheDocument()
        expect(screen.getByText('水')).toBeInTheDocument()
        expect(screen.getByText('title3')).toBeInTheDocument()
        expect(screen.getByText('木')).toBeInTheDocument()
        expect(screen.getByText('title4')).toBeInTheDocument()
        expect(screen.getByText('金')).toBeInTheDocument()
        expect(screen.getByText('title5')).toBeInTheDocument()
        expect(screen.getByText('土')).toBeInTheDocument()
        expect(screen.getByText('title6')).toBeInTheDocument()
        expect(screen.getByText('日')).toBeInTheDocument()
        expect(screen.getByText('title7')).toBeInTheDocument()
    })

    test('display the menu detail when click menu list of target menu', async () => {
        const menuResult: Menu[] = [
            {id: '1', title: 'title1'},
            {id: '2', title: 'title2'},
            {id: '3', title: 'title3'},
            {id: '4', title: 'title4'},
            {id: '5', title: 'title5'},
            {id: '6', title: 'title6'},
            {id: '7', title: 'title7'},
        ]
        spyStubMenuRepo.menu_returnValue = Promise.resolve(menuResult)


        await renderApplication('/menuList', appProps)
        const menuElement = screen.getByText('title1')

        await userEvent.click(menuElement)


        expect(window.location.pathname).toEqual('/menuDetail/1')
    })
})