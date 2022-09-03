import Menu from './Menu'
import Ingredient from './Ingredient'
import Seasoning from './Seasoning'

export default interface MenuStruct {
    menuRecord: Menu
    ingredientRecord: Ingredient[],
    seasoningRecord: Seasoning[],
}