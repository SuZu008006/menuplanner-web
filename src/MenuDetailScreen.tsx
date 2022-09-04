import MenuRepo from './NetworkMenuRepo'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import MenuStruct from './types/MenuStruct'
import styles from './styles/MenuDetailScreen.module.scss'


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
            <table className={styles.table}>
                <tbody>
                <tr className={styles.categoryContainer}>
                    <td className={styles.category}>材料</td>
                    <td className={styles.categoryContent}>
                        {menuStruct?.ingredientRecord
                            .map((ingredient, index) =>
                                <div key={index}>
                                    {ingredient.item},
                                    {ingredient.quantity},
                                    {ingredient.scale}
                                </div>
                            )}
                    </td>
                </tr>
                <tr className={styles.categoryContainer}>
                    <td className={styles.category}>調味料</td>
                    <td className={styles.categoryContent}>
                        {menuStruct?.seasoningRecord
                            .map((seasoning, index) =>
                                <div key={index}>
                                    {seasoning.item},
                                    {seasoning.quantity},
                                    {seasoning.scale}
                                </div>
                            )}
                    </td>
                </tr>
                </tbody>
            </table>
        </>
    )
}