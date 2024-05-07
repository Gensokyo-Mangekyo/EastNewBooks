import { useState } from "react"
import ModalInfo from "./UI/ModalWindows/ModalInfo"

export default function UserContainer(props) {

    const [Visible,SetVisible] = useState(false)
    const [Details,SetDetails] = useState({})
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    return(
        <div className="SellOrderContainer">

{Visible === true ? <ModalInfo SetVisible={SetVisible} >
        <div className="HeaderModal">
            Информация заказа №{Details.id}
        </div>
        <div className="ModalText" >
            Почта: {Details.email}
        </div>
        <div className="ModalText" >
            Населённый пункт: {Details.city}
        </div>
        <div className="ModalText" >
            Адрес: {Details.address}
        </div>
        <div className="ModalText" >
            Индекс: {Details.index}
        </div>
        <div className="ModalText" >
            Сумма заказа: {Details.sum}₽
        </div>
        </ModalInfo> : "" } 
            {props.Orders !== undefined ? 
            props.Orders.map(x=> (
          <div id={x.id} className="ItemSellOrder">
          <div className="LeftSellOrder" >
          <div className="UserName"> {x.user.name} {x.user.surname}</div>
          <div className="Phone">Телефон</div>
          <div className="StadartText Spacing">{x.user.phone} </div>
          <div onClick={()=>{ SetDetails({
            id: x.id,
            email: x.user.email,
            address: x.address,
            city: x.city,
            index: x.index,
            sum: props.Sum[x.id]

          }); SetVisible(true) } } className="DetailsButton">
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
                <div className="UserStatusText">
                {x.status}
                </div>
                <div onClick={()=> {
                    props.RemoveOrder(x.id)
                }} className="DeleteButton">
                    Отменить
                </div>
                 </div>
          </div>
      </div> ))  : ""}
    </div>
    )
}