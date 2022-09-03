import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import MenuRepo from './NetworkMenuRepo'
import styles from './styles/MenuListScreen.module.scss'
import Menu from './Menu'

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
                    <div className={styles.menuHeader}>
                        <div className={styles.dayOfWeek}>
                            {day}
                        </div>
                    </div>
                    <div className={styles.menuContent}>
                        <div
                            className={styles.menuTitle}
                            onClick={() => onClickTitle(Number(menu?.[index].id))}
                        >
                            {menu?.[index].title}
                        </div>
                        <div className={styles.imageContainer}>
                            <div className={styles.imageShade}>
                                <img
                                    className={styles.menuImage}
                                    src={menu?.[index].image}
                                    alt={menu?.[index].image}
                                />
                                <div className={styles.menuImagePin}/>
                            </div>
                        </div>
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
