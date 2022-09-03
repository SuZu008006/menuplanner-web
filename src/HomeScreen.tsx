import styles from './styles/HomeScreen.module.scss'
import {ItadakiAnime} from './ItadakiAnime'

export default function HomeScreen() {

    return (
        <div>
            <ItadakiAnime></ItadakiAnime>
            <button className={styles.menuStart}>
                いただきますの準備をする
            </button>
        </div>
    )
}