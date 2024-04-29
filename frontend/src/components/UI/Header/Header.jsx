import "./Header.css"
import HeadImg from "../../../images/Шапка.png"
import Trubka from "../../../images/Trubka.png"
import Pochta from "../../../images/Pochta.png"

export default function Header() {
    return(
        <div>
        <header className="HeaderImg" >
            <img src={HeadImg}  />
        </header>
        <div className="Contacts" >
        <div>
        <img className="Trubka" src={Trubka}  />
        <p>Позвонить 863 333-20-12</p>
        </div>
        <div>
        <img className="Trubka" src={Pochta}  />
        <p>Почта info@kontur.ru</p>
        </div>
        </div>
        </div>
    )
}