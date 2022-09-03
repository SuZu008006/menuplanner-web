import '@testing-library/jest-dom'
import renderApplication from './RenderApplication'
import {AppProps} from '../App'
import {AppPropsBuilder} from '../AppPropsBuilder'
import {screen, within} from '@testing-library/react'
import {SpyStubMenuRepo} from './SpyStubMenuRepo'
import MenuStruct from '../MenuStruct'

describe('menu summary screen', () => {
    let spyStubMenuRepo: SpyStubMenuRepo
    let appProps: AppProps

    let menuStructResult: MenuStruct

    beforeEach(() => {
        spyStubMenuRepo = new SpyStubMenuRepo()
        appProps = new AppPropsBuilder()
            .withMenuRepo(spyStubMenuRepo)
            .build()
    })

    afterEach(() => {
        sessionStorage.clear()
    })

    test('called menuRepo.menuDetail for the number of menuIdList size', async () => {
        const menuIdListValue = [9999, 9999, 9999].toString()
        sessionStorage.setItem('menuIdList', menuIdListValue)
        menuStructResult = {
            menuRecord: {
                id: 9999,
                title: '',
                image: '',
            },
            ingredientRecord: [
                {
                    ingredient_id: 9999,
                    id: 9999,
                    item: 'itemNameOne',
                    quantity: 10.0,
                    scale: 'scale'
                },
            ],
            seasoningRecord: []
        }

        spyStubMenuRepo.menu_struct_returnValue = Promise.resolve(menuStructResult)


        await renderApplication('/menuSummary', appProps)


        const ingredientElement = screen.getAllByLabelText('ingredient')

        expect(ingredientElement.length).toEqual(menuIdListValue.split(',').length)
    })

    test('display the ingredient list along menuIdList of sessionStorage value', async () => {
        const menuIdListValue = [9999].toString()
        sessionStorage.setItem('menuIdList', menuIdListValue)
        menuStructResult = {
            menuRecord: {
                id: 9999,
                title: '',
                image: '',
            },
            ingredientRecord: [
                {
                    ingredient_id: 9999,
                    id: 9999,
                    item: 'itemNameOne',
                    quantity: 10.0,
                    scale: 'scale'
                },
            ],
            seasoningRecord: []
        }

        spyStubMenuRepo.menu_struct_returnValue = Promise.resolve(menuStructResult)


        await renderApplication('/menuSummary', appProps)


        expect(screen.getByText('itemNameOne,10,scale')).toBeInTheDocument()
    })

    test('display ingredient list that was sorted by items name', async () => {
        const menuIdListValue = [9999].toString()
        sessionStorage.setItem('menuIdList', menuIdListValue)
        menuStructResult = {
            menuRecord: {
                id: 9999,
                title: '',
                image: '',
            },
            ingredientRecord: [
                {
                    ingredient_id: 9999,
                    id: 9999,
                    item: 'itemNameB',
                    quantity: 1.0,
                    scale: 'scaleOne'
                },
                {
                    ingredient_id: 9999,
                    id: 9999,
                    item: 'itemNameA',
                    quantity: 2.0,
                    scale: 'scaleTwo'
                },
            ],
            seasoningRecord: []
        }

        spyStubMenuRepo.menu_struct_returnValue = Promise.resolve(menuStructResult)


        await renderApplication('/menuSummary', appProps)


        const ingredientElement = screen.getAllByLabelText('ingredient')

        expect(ingredientElement.length).toEqual(2)
        expect(within(ingredientElement[0]).getByText('2,')).toBeInTheDocument()
        expect(within(ingredientElement[1]).getByText('1,')).toBeInTheDocument()
    })

    test('display ingredient list that was sorted by scales name', async () => {
        const menuIdListValue = [9999].toString()
        sessionStorage.setItem('menuIdList', menuIdListValue)
        menuStructResult = {
            menuRecord: {
                id: 9999,
                title: '',
                image: '',
            },
            ingredientRecord: [
                {
                    ingredient_id: 9999,
                    id: 9999,
                    item: 'itemName',
                    quantity: 2.0,
                    scale: 'scaleTwo'
                },
                {
                    ingredient_id: 9999,
                    id: 9999,
                    item: 'itemName',
                    quantity: 1.0,
                    scale: 'scaleOne'
                },
            ],
            seasoningRecord: []
        }

        spyStubMenuRepo.menu_struct_returnValue = Promise.resolve(menuStructResult)


        await renderApplication('/menuSummary', appProps)


        const ingredientElement = screen.getAllByLabelText('ingredient')

        expect(ingredientElement.length).toEqual(2)
        expect(within(ingredientElement[0]).getByText('1,')).toBeInTheDocument()
        expect(within(ingredientElement[1]).getByText('2,')).toBeInTheDocument()
    })

    test('display sum quantity at ingredient when is identical with its item', async () => {
        const menuIdListValue = [9999].toString()
        sessionStorage.setItem('menuIdList', menuIdListValue)
        menuStructResult = {
            menuRecord: {
                id: 9999,
                title: '',
                image: '',
            },
            ingredientRecord: [
                {
                    ingredient_id: 9999,
                    id: 9999,
                    item: 'itemNameOne',
                    quantity: 0.15,
                    scale: 'scale'
                },
                {
                    ingredient_id: 9999,
                    id: 9999,
                    item: 'itemNameOne',
                    quantity: 0.25,
                    scale: 'scale'
                },
                {
                    ingredient_id: 9999,
                    id: 9999,
                    item: 'itemNameOne',
                    quantity: 0.35,
                    scale: 'scale'
                },
                {
                    ingredient_id: 9999,
                    id: 9999,
                    item: 'itemNameTwo',
                    quantity: 0.15,
                    scale: 'scale'
                },
            ],
            seasoningRecord: []
        }

        spyStubMenuRepo.menu_struct_returnValue = Promise.resolve(menuStructResult)


        await renderApplication('/menuSummary', appProps)


        const ingredientElement = screen.getAllByLabelText('ingredientSummary')

        expect(ingredientElement.length).toEqual(2)
        expect(within(ingredientElement[0]).getByText('itemNameOne,0.75,scale')).toBeInTheDocument()
        expect(within(ingredientElement[1]).getByText('itemNameTwo,0.15,scale')).toBeInTheDocument()
    })

    test('condition sum quantity is that ingredient and scale is unique', async () => {
        const menuIdListValue = [9999].toString()
        sessionStorage.setItem('menuIdList', menuIdListValue)
        menuStructResult = {
            menuRecord: {
                id: 9999,
                title: '',
                image: '',
            },
            ingredientRecord: [
                {
                    ingredient_id: 9999,
                    id: 9999,
                    item: 'itemName',
                    quantity: 0.15,
                    scale: 'scaleOne'
                },
                {
                    ingredient_id: 9999,
                    id: 9999,
                    item: 'itemName',
                    quantity: 0.25,
                    scale: 'scaleTwo'
                },
            ],
            seasoningRecord: []
        }

        spyStubMenuRepo.menu_struct_returnValue = Promise.resolve(menuStructResult)


        await renderApplication('/menuSummary', appProps)


        const ingredientElement = screen.getAllByLabelText('ingredientSummary')

        expect(ingredientElement.length).toEqual(2)
        expect(within(ingredientElement[0]).getByText('itemName,0.15,scaleOne')).toBeInTheDocument()
        expect(within(ingredientElement[1]).getByText('itemName,0.25,scaleTwo')).toBeInTheDocument()
    })
})