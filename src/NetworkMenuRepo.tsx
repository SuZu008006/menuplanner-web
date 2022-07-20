import {Http} from './NetworkHttp'

export default interface MenuRepo {
    menuList(): Promise<String[]>
}

export class NetworkMenuRepo implements MenuRepo {
    private http: Http

    constructor(http: Http) {
        this.http = http
    }

    async menuList(): Promise<String[]> {
        return await this.http.get('/api/greeting') as String[]
    }
}