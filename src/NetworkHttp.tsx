export interface Http {
    get(url: string): Promise<object>
}

export class NetworkHttp implements Http {
    private readonly serverUrl?: string

    constructor() {
        this.serverUrl = process.env.REACT_APP_SERVER_URL
    }

    async get(url: string): Promise<object> {
        const response = await fetch(this.serverUrl + url)
        return Promise.resolve(response.json())
    }

}