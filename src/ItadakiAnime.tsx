import {useRive} from 'rive-react'
import styles from './styles/HomeScreen.module.scss'

export function ItadakiAnime() {
    const {RiveComponent} = useRive({
        src: 'ItadakiAnime.riv',
        animations: 'Animation 1',
        artboard: 'New Artboard',
        autoplay: true,
    })

    return (
        <RiveComponent
            className={styles.rivContainer}
            role="riv"
        />
    )
}