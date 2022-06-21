import {Http} from './NetworkHttp'
import Menu from './Menu'

export default interface MenuRepo {
    menuList(): Promise<Menu[]>
}

export class NetworkMenuRepo implements MenuRepo {
    private http: Http

    constructor(http: Http) {
        this.http = http
    }

    async menuList(): Promise<Menu[]> {
        return await this.http.get('/api/menu') as Menu[]
    }
}