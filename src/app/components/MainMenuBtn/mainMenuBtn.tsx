import Link from 'next/link'
import style from './page.module.css'

export default function MainBtn() {
    return (
        <Link className={style.mainMenu} href="/">
            <button>Voltar ao menu principal</button>
        </Link>
    )
}