import '@testing-library/jest-dom'
import renderApplication from './RenderApplication'
import {AppProps} from '../App'
import {AppPropsBuilder} from '../AppPropsBuilder'
import {screen, within} from '@testing-library/react'
import {SpyStubMenuRepo} from './SpyStubMenuRepo'
import MenuStruct from '../MenuStruct'

describe('menu detail screen', () => {
    let spyStubMenuRepo: SpyStubMenuRepo
    let appProps: AppProps

    beforeEach(() => {
        spyStubMenuRepo = new SpyStubMenuRepo()
        appProps = new AppPropsBuilder()
            .withMenuRepo(spyStubMenuRepo)
            .build()
    })

    test('display ingredient and seasoning of target menu', async () => {
        const menuStructResult: MenuStruct = {
            menuRecord: {
                id: 1,
                title: 'titleOne',
                image: 'imageOne',
            },
            ingredientRecord: [
                {
                    ingredient_id: 1,
                    id: 1,
                    item: 'itemNameOne',
                    quantity: 1.1,
                    scale: 'scaleOne',
                },
            ],
            seasoningRecord: [
                {
                    seasoning_id: 1,
                    id: 1,
                    item: 'itemNameTwo',
                    quantity: 2.2,
                    scale: 'scaleTwo',
                },
            ]
        }

        spyStubMenuRepo.menu_struct_returnValue = Promise.resolve(menuStructResult)


        await renderApplication('menuDetail/1', appProps)


        const categoryElement = screen.getAllByRole('row') as HTMLElement[]

        expect(within(categoryElement[0]).getByText('材料')).toBeInTheDocument()
        expect(within(categoryElement[0]).getByText('itemNameOne,1.1,scaleOne')).toBeInTheDocument()
        expect(within(categoryElement[1]).getByText('調味料')).toBeInTheDocument()
        expect(within(categoryElement[1]).getByText('itemNameTwo,2.2,scaleTwo')).toBeInTheDocument()
    })
})