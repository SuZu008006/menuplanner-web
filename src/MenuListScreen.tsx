import MenuRepo from './NetworkMenuRepo'
import {useEffect, useState} from 'react'

export default function MenuListScreen(props: {
    menuRepo: MenuRepo
}) {
    const [menu, setMenu] = useState<String[]>()

    useEffect(() => {
        (async () => {
            const result = await props.menuRepo.menuList()
            setMenu(result)
        })()
    }, [props.menuRepo])

    const dayOfWeek = ['月', '火', '水', '木', '金']

    return (
        <>
            {dayOfWeek.map((day, index) =>
                <div key={index}>
                    <span>{day}</span>
                    <span>: </span>
                    <span>{menu?.[index]}</span>
                </div>
            )}
        </>
    )
}
