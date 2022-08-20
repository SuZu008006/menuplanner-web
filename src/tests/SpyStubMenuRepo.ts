import Menu from '../Menu'
import MenuRepo from '../NetworkMenuRepo'
import Ingredient from '../Ingredient'

export class SpyStubMenuRepo implements MenuRepo {
    menuResult: Menu[] = []
    ingredientResult: Ingredient[] = []
    menu_returnValue: Promise<Menu[]> = Promise.resolve(this.menuResult)
    ingredient_returnValue: Promise<Ingredient[]> = Promise.resolve(this.ingredientResult)

    menuList(): Promise<Menu[]> {
        return this.menu_returnValue
    }

    menuDetail(id: number): Promise<Ingredient[]> {
        return this.ingredient_returnValue
    }

    menuSummary(idList: number[]): Promise<Ingredient[]> {
        return this.ingredient_returnValue
    }
}