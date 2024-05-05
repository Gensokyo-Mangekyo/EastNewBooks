import { useState } from "react"
import ModalInfo from "./UI/ModalWindows/ModalInfo"

export default function UserContainer() {

    const [Visible,SetVisible] = useState(false)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    return(
        <div className="SellOrderContainer">

{Visible === true ? <ModalInfo SetVisible={SetVisible} >
        <div className="HeaderModal">
            Информация заказа №228
        </div>
         <div className="ModalText" >
            Дата: 15.10.2023
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
                    <p className="BookItem BookPriceInormation">225P</p>
                    </div>
                    <div className="BlockBook" >
                    <p className="BookItem">PHP и MySQL x1 </p>
                    <p className="BookItem BookPriceInormation">225P</p>
                    </div>
                </div>
                </div>
            </div>
            <div>
            <div className="FunctionsOrder" >
                <p className="StatusOrder" >Статус</p>
                <div className="UserStatusText">
                Рассматривается
                </div>
                <div className="DeleteButton">
                    Отменить
                </div>
                 </div>
            </div>
        </div> 
    </div>
    )
}