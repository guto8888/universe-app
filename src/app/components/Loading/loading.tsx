import { AiOutlineLoading } from "react-icons/ai";
import style from "./page.module.css"

export default function LoadingSpinner() {
    return(
        <div className={style.loading}>
            <AiOutlineLoading size={100} className={style.load}/>
        </div>
    )
}