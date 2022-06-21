import {screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import renderApplication from './RenderApplication'
import Menu from '../Menu'
import MenuRepo from '../NetworkMenuRepo'
import {AppProps} from '../App'
import {AppPropsBuilder} from '../AppPropsBuilder'

class SpyStubMenuRepo implements MenuRepo {
    menuResult: Menu[] = [{
        id: '', category: '', title: '', people: '',
    }]
    menu_returnValue: Promise<Menu[]> = Promise.resolve(this.menuResult)

    menuList(): Promise<Menu[]> {
        return this.menu_returnValue
    }
}

describe('menu list screen', () => {
    let spyStubMenuRepo: SpyStubMenuRepo
    let appProps: AppProps

    test('display the menu list', async () => {
        spyStubMenuRepo = new SpyStubMenuRepo()
        appProps = new AppPropsBuilder()
            .withMenuRepo(spyStubMenuRepo)
            .build()

        const menuResult: Menu[] = [{
            id: '', category: '鶏', title: '唐揚げ', people: '',
        }]
        spyStubMenuRepo.menu_returnValue = Promise.resolve(menuResult)


        await renderApplication('/menuList', appProps)


        expect(screen.getByText('月')).toBeInTheDocument()
        expect(screen.getByText('唐揚げ')).toBeInTheDocument()
    })
})