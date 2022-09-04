import styles from './styles/HomeScreen.module.scss'
import {ItadakiAnime} from './ItadakiAnime'
import {useNavigate} from 'react-router-dom'

export default function HomeScreen() {
    const navigate = useNavigate()

    const onClickMenuList = () => {
        navigate(`/menuList`, {state: {from: window.location}})
    }

    return (
        <div>
            <ItadakiAnime></ItadakiAnime>
            <button
                onClick={() => onClickMenuList()}
                className={styles.menuStart}
            >
                いただきますの準備をする
            </button>
        </div>
    )
}