import '@testing-library/jest-dom'
import renderApplication from './RenderApplication'
import Menu from '../Menu'
import MenuRepo from '../NetworkMenuRepo'
import {AppProps} from '../App'
import {AppPropsBuilder} from '../AppPropsBuilder'
import {screen} from '@testing-library/react'

class SpyStubMenuRepo implements MenuRepo {
    menuResult: Menu[] = []
    menu_returnValue: Promise<Menu[]> = Promise.resolve(this.menuResult)

    menuList(): Promise<Menu[]> {
        return this.menu_returnValue
    }
}

describe('menu list screen', () => {
    let spyStubMenuRepo: SpyStubMenuRepo
    let appProps: AppProps

    test('display the menu list around week', async () => {
        spyStubMenuRepo = new SpyStubMenuRepo()
        appProps = new AppPropsBuilder()
            .withMenuRepo(spyStubMenuRepo)
            .build()
        const menuResult: Menu[] = [
            {id: '1', title: 'title1'},
            {id: '2', title: 'title2'},
            {id: '3', title: 'title3'},
            {id: '4', title: 'title4'},
            {id: '5', title: 'title5'},
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
    })
})