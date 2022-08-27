import {useRive} from 'rive-react'
import styles from './styles/HomeScreen.module.scss'

export function CatPointerMove() {
    const {rive, RiveComponent} = useRive({
        src: 'Cat.riv',
        animations: 'State Machine',
        artboard: 'Cat Artboard',
        autoplay: true,
    })
    if (rive) {
        console.log(rive.contents.artboards)
    }

    return <>
        <RiveComponent
            className={styles.riv}
        />
    </>
}