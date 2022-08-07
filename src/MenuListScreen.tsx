import {useEffect, useState} from 'react'
import Menu from './Menu'
import {useNavigate} from 'react-router-dom'
import MenuRepo from './NetworkMenuRepo'

export default function MenuListScreen(props: {
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

    const dayOfWeek = ['月', '火', '水', '木', '金']

    const onClickTitle = (menuCode: number) => {
        navigate(`/menuDetail/${menuCode}`, {state: {from: window.location}})
    }

    return (
        <>
            {dayOfWeek.map((day, index) =>
                <div key={index}>
                    <span>{day}</span>
                    <span>: </span>
                    <span onClick={() => onClickTitle(index + 1)}>{menu?.[index].title}</span>
                </div>
            )}
        </>
    )
}
