import MenuRepo from './NetworkMenuRepo'
import {useEffect, useState} from 'react'
import Ingredient from './Ingredient'
import {useParams} from 'react-router-dom'

export default function MenuDetailScreen(props: {
    menuRepo: MenuRepo
}) {
    const [ingredient, setIngredient] = useState<Ingredient[]>()

    const menuCode = useParams().menuCode ?? ''

    useEffect(() => {
        (async () => {
            const result = await props.menuRepo.menuDetail(Number(menuCode))
            setIngredient(result)
        })()
    }, [props.menuRepo, menuCode])

    return (
        <>
            {ingredient?.map((ingredient, index) =>
                <div key={index}>
                    {ingredient.item},
                    {ingredient.quantity},
                    {ingredient.scale}
                </div>
            )}
        </>
    )
}