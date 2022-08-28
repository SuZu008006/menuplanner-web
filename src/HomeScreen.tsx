import styles from './styles/HomeScreen.module.scss'
import {CatPointerMove} from './CatPointerMove'
import {RiveHamburger} from './RiveHamburger'
import {RiveMonsterGame} from './RiveMonsterGame'
import {RiveHand} from './RiveHand'
import {HeroBot} from './HeroBot'

export default function HomeScreen() {

    return (
        <div>
            <div className={styles.rivContainer}>
                <CatPointerMove></CatPointerMove>
                <RiveHand></RiveHand>
                <RiveHamburger></RiveHamburger>
                <RiveMonsterGame></RiveMonsterGame>
                <HeroBot></HeroBot>
            </div>
            <button className={styles.menuStart}>
                いただきますの準備をする
            </button>
        </div>
    )
}