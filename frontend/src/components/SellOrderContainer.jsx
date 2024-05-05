import InputValue from "./UI/input/InputValue"
import "../styles/Cabinet.css"
import ModalInfo from "./UI/ModalWindows/ModalInfo"
import { useState } from "react"


export default function SellOrderContainer() {

    const [Visible,SetVisible] = useState(false)

    return (  <div className="SellOrderContainer">
       {Visible === true ? <ModalInfo SetVisible={SetVisible} >
        <div className="HeaderModal">
            Информация заказа №228
        </div>
        <div className="ModalText" >
            Почта: example@mail.ru
        </div>
        <div className="ModalText" >
            Населённый пункт: Ростов-на-Дону 
        </div>
        <div className="ModalText" >
            Адрес: Портовая 240
        </div>
        <div className="ModalText" >
            Индекс: 654324
        </div>
        <div className="ModalText" >
            Сумма заказа: 852₽
        </div>
        </ModalInfo> : "" } 
    <div className="ItemSellOrder">
        <div>
        <div className="UserName"> Андрей Мирошниченко</div>
        <div className="Phone">Телефон</div>
        <div className="StadartText Spacing">+9381081478</div>
        <div onClick={()=> SetVisible(true) } className="DetailsButton">
                Подробнее
            </div>
        </div>
        <div>
        <div className="BooksOrders">
            <p className="BookHeader">Книги</p>
            <div className="AllBookInOrder" >
                <div className="BlockBook" >
                <p className="BookItem">PHP и MySQL x1 </p>
                <p className="BookItem BookPriceInormation">225₽</p>
                </div>
                <div className="BlockBook" >
                <p className="BookItem">PHP и MySQL x1 </p>
                <p className="BookItem BookPriceInormation">225₽</p>
                </div>
            </div>
            </div>
        </div>
        <div>
        <div className="FunctionsOrder" >
            <p className="StatusOrder" >Статус</p>
            <div className="StatusText">
            <InputValue defaultValue={"Рассматривается"} />
            </div>
            <div className="DeleteButton">
                Удалить
            </div>
             
             </div>
        </div>
    </div>     
</div>)
}