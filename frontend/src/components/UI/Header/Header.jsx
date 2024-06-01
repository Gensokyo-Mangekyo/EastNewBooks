import "./Header.css"
import HeadImg from "../../../images/Шапка.png"
import Trubka from "../../../images/Trubka.png"
import Pochta from "../../../images/Pochta.png"
import { useNavigate } from "react-router-dom"

export default function Header() {

    const navigate = useNavigate()

    return(
        <div>
        <header className="HeaderImg" >
            <img src={HeadImg}  />
        </header>
        <div className="Contacts" >
        <div>
        <img className="Trubka" src={Trubka}  />
        <p onClick={()=> {
            navigate("/Info")
        }} >Позвонить 863 294-85-44</p>
        </div>
        <div>
        <img className="Trubka" src={Pochta}  />
        <p onClick={()=> {
             navigate("/Info")
        }} >Почта info@soft-tronik.ru</p>
        </div>
        </div>
        </div>
    )
}