import MenuRepo from './NetworkMenuRepo'
import Menu from './Menu'
import {useEffect, useState} from 'react'

export default function MenuListScreen(props: {
    menuRepo: MenuRepo
}) {
    const [menu, setMenu] = useState<Menu[]>()

    useEffect(() => {
        (async () => {
            const result = await props.menuRepo.menuList()
            setMenu(result)
        })()
    }, [props.menuRepo])

    return (
        <>
            <div>月</div>
            <div>{menu?.[0].title}</div>
        </>
    )
}