import {Http, NetworkHttp} from './NetworkHttp'
import MenuRepo, {NetworkMenuRepo} from './NetworkMenuRepo'
import {AppProps} from './App'

export class AppPropsBuilder {
    private readonly networkHttp: Http
    private menuRepo: MenuRepo

    constructor() {
        this.networkHttp = new NetworkHttp()
        this.menuRepo = new NetworkMenuRepo(this.networkHttp)
    }

    withMenuRepo(newValue: MenuRepo): AppPropsBuilder {
        this.menuRepo = newValue
        return this
    }

    build(): AppProps {
        return {
            menuRepo: this.menuRepo,
        }
    }
}