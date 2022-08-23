import {useEffect, useState} from 'react'
import Menu from './Menu'
import {useNavigate} from 'react-router-dom'
import MenuRepo from './NetworkMenuRepo'
import styles from './styles/MenuListScreen.module.scss'

export default function MenuListScreen(props: {
    menuRepo: MenuRepo
}) {
    const [menu, setMenu] = useState<Menu[]>()

    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            const result = await props.menuRepo.menuList()
            setMenu(result)
            sessionStorage.setItem('menuIdList', result.map(it => it.id).toString())
        })()
    }, [props.menuRepo])

    const dayOfWeek = ['月', '火', '水', '木', '金', '土', '日']

    const onClickTitle = (menuCode: number) => {
        navigate(`/menuDetail/${menuCode}`, {state: {from: window.location}})
    }

    const onClickSummary = () => {
        navigate(`/menuSummary`, {state: {from: window.location}})
    }

    return (
        <>
            {dayOfWeek.map((day, index) =>
                <div className={styles.menuRow} key={index}>
                    <div className={styles.dayOfWeek}>
                        {day}
                    </div>
                    <div
                        className={styles.menuTitle}
                        onClick={() => onClickTitle(Number(menu?.[index].id))}
                    >
                        {menu?.[index].title}
                    </div>
                </div>
            )}
            <button
                onClick={() => onClickSummary()}
                className={styles.shoppingList}
            >
                go to felna
            </button>
        </>
    )
}
