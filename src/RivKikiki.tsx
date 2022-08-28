import {useRive} from 'rive-react'
import styles from './styles/HomeScreen.module.scss'

export function RivKikiki() {
    const {rive, RiveComponent} = useRive({
        src: 'Kikiki.riv',
        animations: 'Animation 1',
        artboard: 'New Artboard',
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