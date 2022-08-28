import {useRive, useStateMachineInput} from 'rive-react'
import styles from './styles/HomeScreen.module.scss'

export function RiveHamburger() {
    const {rive, RiveComponent} = useRive({
        src: 'Hamburger.riv',
        animations: 'Basic State Machine',
        autoplay: true,
    })
    if (rive) {
        // console.log(rive.contents)
    }

    const onClickInput = useStateMachineInput(
        rive,
        'Basic State Machine',
        'Switch',
    )

    return <>
        <RiveComponent
            className={styles.riv}
            onClick={() => onClickInput!.fire()}
        />
    </>
}