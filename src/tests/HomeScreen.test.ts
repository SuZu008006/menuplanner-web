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
})