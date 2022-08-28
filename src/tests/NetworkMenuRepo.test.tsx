import {NetworkMenuRepo} from '../NetworkMenuRepo'
import SpyStubHttp from './SpyStubHttp'


describe('Network menu repository', () => {
    let spyStubNetworkHttp: SpyStubHttp
    let networkMenuRepo: NetworkMenuRepo

    describe('menu', () => {
        test('return JSON by parse as array', async () => {
            spyStubNetworkHttp = new SpyStubHttp()
            networkMenuRepo = new NetworkMenuRepo(spyStubNetworkHttp)

            spyStubNetworkHttp.get_returnValue = Promise.resolve([
                {
                    'id': '1',
                    'title': 'titleOne',
                    'image': 'imageOne',
                },
            ])


            const returnedMenu = await networkMenuRepo.menuList()


            expect(returnedMenu).toEqual([{
                'id': '1',
                'title': 'titleOne',
                'image': 'imageOne',
            }])
        })
    })

    describe('menuDetail(ingredient)', () => {
        test('return JSON by parse as array', async () => {
            spyStubNetworkHttp = new SpyStubHttp()
            networkMenuRepo = new NetworkMenuRepo(spyStubNetworkHttp)

            spyStubNetworkHttp.get_returnValue = Promise.resolve([
                {
                    'ingredient_id': 1,
                    'id': 1,
                    'item': 'itemNameOne',
                    'quantity': '1',
                    'scale': 'g',
                },
            ])


            const returnedMenu = await networkMenuRepo.menuDetail(1)


            expect(returnedMenu).toEqual([
                {
                    'ingredient_id': 1,
                    'id': 1,
                    'item': 'itemNameOne',
                    'quantity': '1',
                    'scale': 'g',
                },
            ])
        })
    })

    describe('menuSummary(a week of ingredient)', () => {
        test('return JSON by parse as array', async () => {
            spyStubNetworkHttp = new SpyStubHttp()
            networkMenuRepo = new NetworkMenuRepo(spyStubNetworkHttp)

            spyStubNetworkHttp.get_returnValue = Promise.resolve([
                {
                    'ingredient_id': 1,
                    'id': 1,
                    'item': 'itemNameOne',
                    'quantity': '1',
                    'scale': 'g',
                },
            ])


            const returnedMenu
                = await networkMenuRepo.menuSummary([1, 2, 3, 4, 5, 6, 7])


            expect(returnedMenu).toEqual([{
                'ingredient_id': 1,
                'id': 1,
                'item': 'itemNameOne',
                'quantity': '1',
                'scale': 'g',
            },])
        })
    })
})