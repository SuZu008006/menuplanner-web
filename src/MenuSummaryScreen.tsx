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


    return (
        <>
            お買い物リストの予定（工事中…）
        </>
    )
}
