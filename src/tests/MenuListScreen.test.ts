import '@testing-library/jest-dom'
import renderApplication from './RenderApplication'
import {AppProps} from '../App'
import {AppPropsBuilder} from '../AppPropsBuilder'
import {screen, within} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {SpyStubMenuRepo} from './SpyStubMenuRepo'
import Ingredient from '../Ingredient'
import Menu from '../Menu'

describe('menu list screen', () => {
    let spyStubMenuRepo: SpyStubMenuRepo
    let appProps: AppProps

    const menuResult: Menu[] = [
        {id: 1, title: 'titleOne', image: 'imageOne'},
        {id: 2, title: 'titleTwo', image: 'imageTwo'},
        {id: 3, title: 'titleThree', image: 'imageThree'},
        {id: 4, title: 'titleFour', image: 'imageFour'},
        {id: 5, title: 'titleFive', image: 'imageFive'},
        {id: 6, title: 'titleSix', image: 'imageSix'},
        {id: 7, title: 'titleSeven', image: 'imageSeven'},
    ]
    const ingredientResult: Ingredient[] = [
        {
            ingredient_id: 9999,
            id: 9999,
            item: 'itemName',
            quantity: 99.99,
            scale: 'scale'
        },
    ]

    beforeEach(() => {
        spyStubMenuRepo = new SpyStubMenuRepo()
        appProps = new AppPropsBuilder()
            .withMenuRepo(spyStubMenuRepo)
            .build()
    })

    test('display the menu list around week', async () => {
        spyStubMenuRepo.menu_returnValue = Promise.resolve(menuResult)


        await renderApplication('/menuList', appProps)


        expect(screen.getByText('月')).toBeInTheDocument()
        expect(screen.getByText('titleOne')).toBeInTheDocument()
        expect(screen.getByAltText('imageOne')).toBeInTheDocument()
        expect(screen.getByText('火')).toBeInTheDocument()
        expect(screen.getByText('titleTwo')).toBeInTheDocument()
        expect(screen.getByAltText('imageTwo')).toBeInTheDocument()
        expect(screen.getByText('水')).toBeInTheDocument()
        expect(screen.getByText('titleThree')).toBeInTheDocument()
        expect(screen.getByAltText('imageThree')).toBeInTheDocument()
        expect(screen.getByText('木')).toBeInTheDocument()
        expect(screen.getByText('titleFour')).toBeInTheDocument()
        expect(screen.getByAltText('imageFour')).toBeInTheDocument()
        expect(screen.getByText('金')).toBeInTheDocument()
        expect(screen.getByText('titleFive')).toBeInTheDocument()
        expect(screen.getByAltText('imageFive')).toBeInTheDocument()
        expect(screen.getByText('土')).toBeInTheDocument()
        expect(screen.getByText('titleSix')).toBeInTheDocument()
        expect(screen.getByAltText('imageSix')).toBeInTheDocument()
        expect(screen.getByText('日')).toBeInTheDocument()
        expect(screen.getByText('titleSeven')).toBeInTheDocument()
        expect(screen.getByAltText('imageSeven')).toBeInTheDocument()
    })

    test('display the menu detail when click menu list of target menu', async () => {
        spyStubMenuRepo.menu_returnValue = Promise.resolve(menuResult)

        await renderApplication('/menuList', appProps)
        const menuElement = screen.getAllByRole('row')


        await userEvent.click(menuElement[0])


        expect(window.location.pathname).toEqual('/menuDetail/1')
    })


    test('display the menu summary button', async () => {
        spyStubMenuRepo.menu_returnValue = Promise.resolve(menuResult)


        await renderApplication('/menuList', appProps)


        const buttonElement = screen.getByRole('button')

        expect(buttonElement).toBeInTheDocument()
        expect(within(buttonElement).getByText('go to felna')).toBeInTheDocument()
    })

    test('display the menu summary when click menu list of summary button', async () => {
        spyStubMenuRepo.menu_returnValue = Promise.resolve(menuResult)
        spyStubMenuRepo.ingredient_returnValue = Promise.resolve(ingredientResult)

        await renderApplication('/menuList', appProps)

        const buttonElement = screen.getByRole('button')


        await userEvent.click(buttonElement)


        expect(window.location.pathname).toEqual('/menuSummary')
    })

    test('menuIdList get to sessionStorage', async () => {
        spyStubMenuRepo.menu_returnValue = Promise.resolve(menuResult)
        spyStubMenuRepo.ingredient_returnValue = Promise.resolve(ingredientResult)


        await renderApplication('/menuList', appProps)


        const afterRenderValue = sessionStorage.getItem('menuIdList')

        expect(afterRenderValue).toEqual('1,2,3,4,5,6,7')
        sessionStorage.clear()
    })
})