import {useRive} from 'rive-react'
import styles from './styles/HomeScreen.module.scss'

export function RiveHand() {
    const {rive, RiveComponent} = useRive({
        src: 'Hand.riv',
        animations: 'Tap & Hold',
        autoplay: true,
    })
    if (rive) {
        // console.log(rive.contents)
    }

    return <>
        <RiveComponent
            className={styles.riv}
            onClick={() => rive?.play()}
        />
    </>
}