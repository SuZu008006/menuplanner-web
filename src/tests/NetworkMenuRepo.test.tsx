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
                },
            ])


            const returnedMenu = await networkMenuRepo.menuList()


            expect(returnedMenu).toEqual([{
                'id': '1',
                'title': 'titleOne',
            }])
        })
    })
})