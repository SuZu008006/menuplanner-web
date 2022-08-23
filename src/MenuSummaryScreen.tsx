import {useEffect, useState} from 'react'
import MenuRepo from './NetworkMenuRepo'
import Ingredient from './Ingredient'
import IngredientSummary from './IngredientSummary'


export default function MenuSummaryScreen(props: {
    menuRepo: MenuRepo
}) {
    const [ingredientSummary, setIngredientSummary] = useState<IngredientSummary[]>()
    const [ingredientMatrix, setIngredientMatrix] = useState<Ingredient[][]>()


    useEffect(() => {
        (async () => {
            let result: Ingredient[]

            const menuIdList = sessionStorage.getItem('menuIdList')

            const sevenIdList
                = (menuIdList != null) ? menuIdList.split(',') : []

            const sevenIdListIngredient
                = await Promise.all(sevenIdList.map(async (it) => {
                    return await props.menuRepo.menuDetail(Number(it))
                }
            ))
            result = sevenIdListIngredient.flat()
            result.sort(function (a, b) {
                return (a.scale < b.scale) ? -1 : 1
            })
            result.sort(function (a, b) {
                return (a.item < b.item) ? -1 : 1
            })

            let resultGroupByItem: IngredientSummary[]
            let resultMatrix: Ingredient[][] = []

            let column = 0
            resultMatrix.push([])
            result.forEach((it, index) => {
                resultMatrix[column].push({
                    ingredient_id: it.ingredient_id,
                    id: it.id,
                    item: it.item,
                    quantity: it.quantity,
                    scale: it.scale,
                })
                if (index < result.length - 1) {
                    if (it.item === result[index + 1].item && it.scale === result[index + 1].scale) {
                    } else {
                        column += 1
                        resultMatrix.push([])
                    }
                }
            })

            resultGroupByItem = resultMatrix.map((itList) => {
                return itList.reduce((previous, current) => {
                    return {
                        count: itList.length,
                        item: current.item,
                        quantity: previous.quantity + current.quantity,
                        scale: current.scale,
                    }
                }, {
                    count: 0,
                    item: '',
                    quantity: 0,
                    scale: '',
                })
            })

            setIngredientSummary(resultGroupByItem)
            setIngredientMatrix(resultMatrix)
        })()
    }, [props.menuRepo])


    return (
        <>
            お買い物リストの予定（工事中…）
            {ingredientSummary?.map((ingredient, summaryIndex) => {
                return <details key={'details' + summaryIndex}>
                    <summary aria-label="ingredientSummary" key={'summary' + summaryIndex}>
                        {ingredient.item},
                        {ingredient.quantity},
                        {ingredient.scale}
                    </summary>
                    {ingredientMatrix![summaryIndex].map((ingredient, index) =>
                        <div aria-label="ingredient" key={'summary' + summaryIndex + 'ingredient' + index}>
                            {ingredient.quantity},
                        </div>
                    )}
                </details>
            })}
        </>
    )
}
