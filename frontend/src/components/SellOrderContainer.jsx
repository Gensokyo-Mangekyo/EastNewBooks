import InputValue from "./UI/input/InputValue"
import "../styles/Cabinet.css"
import ModalInfo from "./UI/ModalWindows/ModalInfo"
import { useState } from "react"


export default function SellOrderContainer(props) {

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
        {props.Orders !== undefined ? 
            props.Orders.map(x=> (
          <div className="ItemSellOrder">
          <div className="LeftSellOrder" >
          <div className="UserName"> {x.user.name} {x.user.surname}</div>
          <div className="Phone">Телефон</div>
          <div className="StadartText Spacing">{x.user.phone} </div>
          <div onClick={()=> SetVisible(true) } className="DetailsButton">
                  Подробнее
              </div>
          </div>
          <div>
          <div className="BooksOrders">
              <p className="BookHeader">Книги</p>
              <div className="AllBookInOrder" >
                    {x.orderBooks.map(x=> (
                            <div className="BlockBook" >
                            <p className="BookItem"> {x.book.name} x {x.count} </p>
                            <p className="BookItem BookPriceInormation">{x.price}₽</p>
                            </div>
                    ))}
              </div>
              </div>
          </div>
          <div>
          <div className="FunctionsOrder" >
              <p className="StatusOrder" >Статус</p>
              <div className="StatusText">
              <InputValue defaultValue={x.status} />
              </div>
              <div className="DeleteButton">
                  Удалить
              </div>
               
               </div>
          </div>
      </div> ))  : ""}
    
</div>)
}