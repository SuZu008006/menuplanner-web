import {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import MenuRepo from './NetworkMenuRepo'
import Ingredient from './Ingredient'
import IngredientSummary from './IngredientSummary'


export default function MenuSummaryScreen(props: {
    menuRepo: MenuRepo
}) {
    const [ingredient, setIngredient] = useState<Ingredient[]>()
    const [ingredientSummary, setIngredientSummary] = useState<IngredientSummary[]>()


    const idList = useParams().idList ?? []

    useEffect(() => {
        (async () => {
            const result = await props.menuRepo.menuSummary([1, 2, 3, 4, 5, 6, 7])
            result.sort(function (a, b) {
                return (a.item < b.item) ? -1 : 1
            })


            let resultGroupByItem: IngredientSummary[] = []
            let sameItemCount = 1
            let sameQuantity = 0.00
            sameQuantity = result[0].quantity
            result.forEach((it, index) => {
                if (index < result.length - 1) {
                    if (it.item === result[index + 1].item) {
                        sameItemCount += 1
                        sameQuantity = Number((sameQuantity + result[index + 1].quantity).toFixed(2))
                    } else if (sameItemCount === 1) {
                        resultGroupByItem.push({
                            count: sameItemCount,
                            item: it.item,
                            quantity: it.quantity,
                            scale: it.scale,
                        })
                    } else {
                        resultGroupByItem.push({
                            count: sameItemCount,
                            item: it.item,
                            quantity: sameQuantity,
                            scale: it.scale,
                        })
                        sameItemCount = 1
                        sameQuantity = result[index + 1].quantity
                    }
                } else {
                    resultGroupByItem.push({
                        count: sameItemCount,
                        item: it.item,
                        quantity: it.quantity,
                        scale: it.scale,
                    })
                }
            })


            setIngredient(result)
            setIngredientSummary(resultGroupByItem)
        })()
    }, [props.menuRepo])

    const navigate = useNavigate()

    const sevenDays = [1, 2, 3, 4, 5, 6, 7]
    const sevenIdList = sevenDays.map(day =>
        sessionStorage.getItem((day - 1).toString())
    )

    return <>
        お買い物リストの予定（工事中…）
        {ingredient?.map((ingredient, index) =>
            <div aria-label="ingredient" key={index}>
                {ingredient.item},
                {ingredient.quantity},
                {ingredient.scale}
            </div>
        )}
        {ingredientSummary?.map((ingredient, index) =>
            <div aria-label="ingredientSummary" key={index}>
                {ingredient.count},
                {ingredient.item},
                {ingredient.quantity},
                {ingredient.scale}
            </div>
        )}
    </>
}
