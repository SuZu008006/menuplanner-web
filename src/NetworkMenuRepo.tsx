import {Http} from './NetworkHttp'
import Menu from './Menu'
import Ingredient from './Ingredient'

export default interface MenuRepo {
    menuList(): Promise<Menu[]>

    menuDetail(id: number): Promise<Ingredient[]>
}

export class NetworkMenuRepo implements MenuRepo {
    private http: Http

    constructor(http: Http) {
        this.http = http
    }

    async menuList(): Promise<Menu[]> {
        return await this.http.get('/api/menu') as Menu[]
    }

    async menuDetail(id: number): Promise<Ingredient[]> {
        return await this.http.get(`/api/menu/${id}`) as Ingredient[]
    }
}