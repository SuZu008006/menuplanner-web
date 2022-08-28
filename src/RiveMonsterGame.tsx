import {useRive} from 'rive-react'
import styles from './styles/HomeScreen.module.scss'

export function RiveMonsterGame() {
    const {rive, RiveComponent} = useRive({
        src: 'MonsterGame.riv',
        animations: 'Motion',
        autoplay: true,
    })
    if (rive) {
        // console.log(rive.contents)
    }

    return <>
        <RiveComponent
            className={styles.riv}
        />
    </>
}