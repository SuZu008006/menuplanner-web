import {screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import renderApplication from './RenderApplication'

describe('menu list screen', () => {

    test('display the menu list', async () => {
        await renderApplication('/menuList')


        expect(screen.getByText('月')).toBeInTheDocument()
    })
})