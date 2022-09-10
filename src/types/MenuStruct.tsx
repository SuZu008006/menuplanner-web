import Menu from './Menu'
import Ingredient from './Ingredient'
import Seasoning from './Seasoning'
import {Make} from "./Make";

export default interface MenuStruct {
    menuRecord: Menu
    ingredientRecord: Ingredient[],
    seasoningRecord: Seasoning[],
    makeRecord: Make[],
}