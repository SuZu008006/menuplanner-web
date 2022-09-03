import {Http} from './NetworkHttp'
import Ingredient from './Ingredient'
import Menu from './Menu'
import MenuStruct from './MenuStruct'

export default interface MenuRepo {
    menuList(): Promise<Menu[]>

    menuDetail(id: number): Promise<MenuStruct>

    menuSummary(idList: number[]): Promise<Ingredient[]>
}

export class NetworkMenuRepo implements MenuRepo {
    private http: Http

    constructor(http: Http) {
        this.http = http
    }

    async menuList(): Promise<Menu[]> {
        return await this.http.get('/api/menu') as Menu[]
    }

    async menuDetail(id: number): Promise<MenuStruct> {
        return await this.http.get(`/api/menu/${id}`) as MenuStruct
    }

    async menuSummary(idList: number[]): Promise<Ingredient[]> {
        const idListToApiString
            = `${idList[0]}+${idList[1]}+${idList[2]}+${idList[3]}` +
            `+${idList[4]}+${idList[5]}+${idList[6]}`

        return await this.http.get(`/api/menu/summary/${idListToApiString}`) as Ingredient[]
    }
}