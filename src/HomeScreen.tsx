import styles from './styles/HomeScreen.module.scss'
import {useRive, useStateMachineInput} from 'rive-react'
import {CatPointerMove} from './CatPointerMove'

function RiveHamburger() {
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

function RiveMonsterGame() {
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

function RiveHand() {
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

export default function HomeScreen() {

    return (
        <div>
            <div className={styles.rivContainer}>
                <CatPointerMove></CatPointerMove>
                <RiveHand></RiveHand>
                <RiveHamburger></RiveHamburger>
                <RiveMonsterGame></RiveMonsterGame>
            </div>
            <button className={styles.menuStart}>
                いただきますの準備をする
            </button>
        </div>
    )
}