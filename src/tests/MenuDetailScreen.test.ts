import '@testing-library/jest-dom'
import renderApplication from './RenderApplication'
import {AppProps} from '../App'
import {AppPropsBuilder} from '../AppPropsBuilder'
import {screen, within} from '@testing-library/react'
import {SpyStubMenuRepo} from './SpyStubMenuRepo'
import MenuStruct from '../types/MenuStruct'

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
            ],
            makeRecord: [
                {
                    make_id: 1,
                    id: 1,
                    content: "contentOne",
                }
            ]
        }

        spyStubMenuRepo.menu_struct_returnValue = Promise.resolve(menuStructResult)


        await renderApplication('menuDetail/1', appProps)


        const categoryElement = screen.getAllByRole('table')[0] as HTMLElement
        const categoryTrElement = within(categoryElement).getAllByRole('row')

        expect(within(categoryTrElement[0]).getByText('材料')).toBeInTheDocument()
        expect(within(categoryTrElement[0]).getByText('itemNameOne')).toBeInTheDocument()
        expect(within(categoryTrElement[0]).getByText('1.1')).toBeInTheDocument()
        expect(within(categoryTrElement[0]).getByText('scaleOne')).toBeInTheDocument()
        expect(within(categoryTrElement[2]).getByText('調味料')).toBeInTheDocument()
        expect(within(categoryTrElement[2]).getByText('itemNameTwo')).toBeInTheDocument()
        expect(within(categoryTrElement[2]).getByText('2.2')).toBeInTheDocument()
        expect(within(categoryTrElement[2]).getByText('scaleTwo')).toBeInTheDocument()
        expect(within(categoryTrElement[4]).getByText('作り方')).toBeInTheDocument()
        expect(within(categoryTrElement[4]).getByText('1')).toBeInTheDocument()
        expect(within(categoryTrElement[4]).getByText('contentOne')).toBeInTheDocument()
    })
})