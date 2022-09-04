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
        <table className={styles.table}>
            <tbody>
            <tr className={styles.categoryContainer}>
                <td className={styles.category}>材料</td>
                <td className={styles.categoryContent}>
                    <table className={styles.subTable}>
                        <tbody>
                        {menuStruct?.ingredientRecord
                            .map((ingredient, index) =>
                                <tr
                                    className={styles.subCategoryContainer}
                                    key={index}
                                >
                                    <td className={styles.tdItem}>{ingredient.item}</td>
                                    <td className={styles.tdQuantity}>{ingredient.quantity}</td>
                                    <td className={styles.tdScale}>{ingredient.scale}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </td>
            </tr>
            <tr className={styles.categoryContainer}>
                <td className={styles.category}>調味料</td>
                <td className={styles.categoryContent}>
                    <table className={styles.subTable}>
                        <tbody>
                        {menuStruct?.seasoningRecord
                            .map((seasoning, index) =>
                                <tr
                                    className={styles.subCategoryContainer}
                                    key={index}
                                >
                                    <td className={styles.tdItem}>{seasoning.item}</td>
                                    <td className={styles.tdQuantity}>{seasoning.quantity}</td>
                                    <td className={styles.tdScale}>{seasoning.scale}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </td>
            </tr>
            </tbody>
        </table>
    )
}