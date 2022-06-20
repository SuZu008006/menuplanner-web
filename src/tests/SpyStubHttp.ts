import {Http} from '../NetworkHttp'

export default class SpyStubHttp implements Http {
    get_argument_url?: string = undefined
    get_returnValue: Promise<object> = Promise.resolve({})

    get(url: string): Promise<object> {
        this.get_argument_url = url
        return this.get_returnValue
    }
}