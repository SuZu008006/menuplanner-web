import '@testing-library/jest-dom'
import {SpyStubMenuRepo} from './SpyStubMenuRepo'
import {AppProps} from '../App'
import {AppPropsBuilder} from '../AppPropsBuilder'
import renderApplication from './RenderApplication'
import {screen, within} from '@testing-library/react'

describe('menu app', () => {
    let spyStubMenuRepo: SpyStubMenuRepo
    let appProps: AppProps

    beforeEach(() => {
        spyStubMenuRepo = new SpyStubMenuRepo()
        appProps = new AppPropsBuilder()
            .withMenuRepo(spyStubMenuRepo)
            .build()
    })

    describe('header area', () => {
        test('display menu app name(menu planner)', async () => {
            (global as any).IntersectionObserver
                = jest.fn().mockImplementation(() => ({
                observe: () => jest.fn(),
            }))


            await renderApplication('/', appProps)


            const headerElement = screen.getByRole('banner')
            expect(within(headerElement).getByText('menu planner')).toBeInTheDocument()
        })
    })
})
