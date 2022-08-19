import {useEffect, useState} from 'react'
import Menu from './Menu'
import {useNavigate} from 'react-router-dom'
import MenuRepo from './NetworkMenuRepo'

export default function MenuSummaryScreen(props: {
    menuRepo: MenuRepo
}) {
    const [menu, setMenu] = useState<Menu[]>()

    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            const result = await props.menuRepo.menuList()
            setMenu(result)
        })()
    }, [props.menuRepo])

    const sevenDays = [1, 2, 3, 4, 5, 6, 7]
    const ingredientList = sevenDays.map(day =>
        sessionStorage.getItem((day - 1).toString())
    )

    return (
        <>
            お買い物リストの予定（工事中…）
            {ingredientList.map(ingredient => {
                return <div>
                    {ingredient}
                </div>
            })}
        </>
    )
}
