import '@testing-library/jest-dom'
import renderApplication from './RenderApplication'
import {AppProps} from '../App'
import {AppPropsBuilder} from '../AppPropsBuilder'
import {screen, within} from '@testing-library/react'
import {SpyStubMenuRepo} from './SpyStubMenuRepo'
import Ingredient from '../Ingredient'

describe('menu summary screen', () => {
    let spyStubMenuRepo: SpyStubMenuRepo
    let appProps: AppProps

    let ingredientResult: Ingredient[]

    beforeEach(() => {
        spyStubMenuRepo = new SpyStubMenuRepo()
        appProps = new AppPropsBuilder()
            .withMenuRepo(spyStubMenuRepo)
            .build()
    })

    test('display the ingredient list around week', async () => {
        ingredientResult = [
            {
                ingredient_id: 9999,
                id: 9999,
                item: 'itemNameOne',
                quantity: 10.0,
                scale: 'scale'
            },
        ]

        spyStubMenuRepo.ingredient_returnValue = Promise.resolve(ingredientResult)


        await renderApplication('/menuSummary', appProps)


        expect(screen.getByText('itemNameOne,10,scale')).toBeInTheDocument()
    })

    test('display ingredient list that was sorted by items name', async () => {
        ingredientResult = [
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
                quantity: 1.0,
                scale: 'scaleTwo'
            },
        ]

        spyStubMenuRepo.ingredient_returnValue = Promise.resolve(ingredientResult)


        await renderApplication('/menuSummary', appProps)


        const ingredientElement = screen.getAllByLabelText('ingredient')

        expect(ingredientElement.length).toEqual(2)
        expect(within(ingredientElement[0]).getByText('itemNameA,1,scaleTwo')).toBeInTheDocument()
        expect(within(ingredientElement[1]).getByText('itemNameB,1,scaleOne')).toBeInTheDocument()
    })

    test('display sum quantity at ingredient when is identical with its item', async () => {
        ingredientResult = [
            {
                ingredient_id: 9999,
                id: 9999,
                item: 'itemName',
                quantity: 0.15,
                scale: 'scale'
            },
            {
                ingredient_id: 9999,
                id: 9999,
                item: 'itemName',
                quantity: 0.25,
                scale: 'scale'
            },
            {
                ingredient_id: 9999,
                id: 9999,
                item: 'itemName',
                quantity: 0.35,
                scale: 'scale'
            },
            {
                ingredient_id: 9999,
                id: 9999,
                item: 'itemNameOther',
                quantity: 0.1,
                scale: 'scale'
            },
        ]

        spyStubMenuRepo.ingredient_returnValue = Promise.resolve(ingredientResult)


        await renderApplication('/menuSummary', appProps)


        const ingredientElement = screen.getAllByLabelText('ingredientSummary')

        expect(ingredientElement.length).toEqual(2)
        expect(within(ingredientElement[0]).getByText('3,itemName,0.75,scale')).toBeInTheDocument()
        expect(within(ingredientElement[1]).getByText('1,itemNameOther,0.1,scale')).toBeInTheDocument()
    })

})