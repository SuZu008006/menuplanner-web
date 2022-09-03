import MenuRepo from './NetworkMenuRepo'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import MenuStruct from './MenuStruct'

export default function MenuDetailScreen(props: {
    menuRepo: MenuRepo
}) {
    const [menuStruct, setMenuStruct] = useState<MenuStruct>()

    const menuCode = useParams().menuCode ?? ''

    useEffect(() => {
        (async () => {
            const result = await props.menuRepo.menuDetail(Number(menuCode))
            setMenuStruct(result)
        })()
    }, [props.menuRepo, menuCode])

    return (
        <>
            {menuStruct?.ingredientRecord.map((ingredient, index) =>
                <div key={index}>
                    {ingredient.item},
                    {ingredient.quantity},
                    {ingredient.scale}
                </div>
            )}
            {menuStruct?.seasoningRecord.map((seasoning, index) =>
                <div key={index}>
                    {seasoning.item},
                    {seasoning.quantity},
                    {seasoning.scale}
                </div>
            )}
        </>
    )
}