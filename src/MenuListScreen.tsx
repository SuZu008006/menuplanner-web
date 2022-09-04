import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import MenuRepo from './NetworkMenuRepo'
import styles from './styles/MenuListScreen.module.scss'
import Menu from './types/Menu'

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
            <table className={styles.table}>
                <tbody>
                {dayOfWeek.map((day, index) =>
                    <tr
                        key={index}
                        className={styles.menuRow}
                        onClick={() => onClickTitle(Number(menu?.[index].id))}
                    >
                        <td className={styles.dayOfWeek}>
                            {day}
                        </td>
                        <td className={styles.menuContainer}>
                            <div className={styles.menuTitle}>
                                {menu?.[index].title}
                            </div>
                            <div className={styles.imageContainer}>
                                <div className={styles.imageShade}>
                                    <img
                                        className={styles.menuImage}
                                        src={menu?.[index].image}
                                        alt={menu?.[index].image}
                                        loading={'lazy'}
                                    />
                                    <div className={styles.menuImagePin}/>
                                </div>
                            </div>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
            <button
                onClick={() => onClickSummary()}
                className={styles.shoppingList}
            >
                go to felna
            </button>
        </>
    )
}
