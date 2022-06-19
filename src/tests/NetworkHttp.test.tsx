import {Http, NetworkHttp} from '../NetworkHttp'


describe('network http', () => {
    describe('get requests', () => {
        let networkHttp: Http

        beforeEach(() => {
            process.env.REACT_APP_SERVER_URL = 'http://server-name:9999'

            global.fetch = jest.fn(() =>
                Promise.resolve({
                    json: () => Promise.resolve([{test: '100'}]),
                }),
            ) as jest.Mock

            networkHttp = new NetworkHttp()
        })

        test('return URL arg. to fetch', async () => {
            await networkHttp.get('/api/menu')


            expect(global.fetch).lastCalledWith('http://server-name:9999/api/menu')
        })

        test('return JSON to fetch', async () => {
            const responseJsonAsObject = await networkHttp.get('')


            expect(responseJsonAsObject).toEqual([{test: '100'}])
        })
    })
})