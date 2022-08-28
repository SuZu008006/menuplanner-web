import {useRive} from 'rive-react'
import styles from './styles/HomeScreen.module.scss'

export function HeroBot() {
    const {rive, RiveComponent} = useRive({
        src: 'HeroBot.riv',
        animations: 'State Machine 1',
        artboard: 'HeroBot',
        autoplay: true,
    })
    if (rive) {
        console.log(rive.contents)
    }

    return <>
        <RiveComponent
            className={styles.riv}
            onClick={() => rive?.play()}
        />
    </>
}