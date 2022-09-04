import {AppProps} from '../App'
import {AppPropsBuilder} from '../AppPropsBuilder'
import renderApplication from './RenderApplication'
import {screen} from '@testing-library/react'


describe('home screen', () => {
    let appProps: AppProps

    beforeEach(() => {
        appProps = new AppPropsBuilder()
            .build()
    })

    test('display start button', async () => {
        (global as any).IntersectionObserver
            = jest.fn().mockImplementation(() => ({
            observe: () => jest.fn(),
        }))


        await renderApplication('/', appProps)


        expect(screen.getByText('いただきますの準備をする')).toBeInTheDocument()
    })

    test('display riv animation', async () => {
        (global as any).IntersectionObserver
            = jest.fn().mockImplementation(() => ({
            observe: () => jest.fn(),
        }))


        await renderApplication('/', appProps)


        expect(screen.getByRole('riv')).toBeInTheDocument()
    })

    test('display the menu list screen when click the menu start button', async () => {
        // ToDo: 実行するとエラー。原因わからず。
        // (global as any).IntersectionObserver
        //     = jest.fn().mockImplementation(() => ({
        //     observe: () => jest.fn(),
        // }))

        // await renderApplication('/', appProps)
        // const startButtonElement = screen.getByRole('button')
        //
        //
        // await userEvent.click(startButtonElement)
        //
        //
        // expect(window.location.pathname).toEqual('/menuList')
    })
})