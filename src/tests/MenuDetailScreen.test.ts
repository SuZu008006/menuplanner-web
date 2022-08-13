import '@testing-library/jest-dom'
import renderApplication from './RenderApplication'
import {AppProps} from '../App'
import {AppPropsBuilder} from '../AppPropsBuilder'
import {screen} from '@testing-library/react'
import {SpyStubMenuRepo} from './SpyStubMenuRepo'
import Ingredient from '../Ingredient'

describe('menu detail screen', () => {
    let spyStubMenuRepo: SpyStubMenuRepo
    let appProps: AppProps

    beforeEach(() => {
        spyStubMenuRepo = new SpyStubMenuRepo()
        appProps = new AppPropsBuilder()
            .withMenuRepo(spyStubMenuRepo)
            .build()
    })

    test('display ingredient of target menu', async () => {
        const ingredientResult: Ingredient[] = [
            {
                ingredient_id: 1,
                id: 1,
                item: 'itemNameOne',
                quantity: '大さじ1',
            },
            {
                ingredient_id: 2,
                id: 1,
                item: 'itemNameTwo',
                quantity: '大さじ2',
            },
        ]
        spyStubMenuRepo.ingredient_returnValue = Promise.resolve(ingredientResult)


        await renderApplication('menuDetail/1', appProps)


        expect(screen.getByText('itemNameOne,大さじ1')).toBeInTheDocument()
    })
})