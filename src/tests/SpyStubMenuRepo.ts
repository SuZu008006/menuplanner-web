import MenuRepo from '../NetworkMenuRepo'
import Ingredient from '../types/Ingredient'
import Menu from '../types/Menu'
import MenuStruct from '../types/MenuStruct'

export class SpyStubMenuRepo implements MenuRepo {
    menuResult: Menu[] = []
    ingredientResult: Ingredient[] = []
    menuStructResult: MenuStruct = {
        menuRecord: {id: 0, title: '', image: ''},
        ingredientRecord: [],
        seasoningRecord: [],
        makeRecord: [],
    }
    menu_returnValue: Promise<Menu[]> = Promise.resolve(this.menuResult)
    menu_struct_returnValue: Promise<MenuStruct> = Promise.resolve(this.menuStructResult)
    ingredient_returnValue: Promise<Ingredient[]> = Promise.resolve(this.ingredientResult)

    menuList(): Promise<Menu[]> {
        return this.menu_returnValue
    }

    menuDetail(id: number): Promise<MenuStruct> {
        return this.menu_struct_returnValue
    }

    menuSummary(idList: number[]): Promise<Ingredient[]> {
        return this.ingredient_returnValue
    }
}