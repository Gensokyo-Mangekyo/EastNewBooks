import InputValue from "./UI/input/InputValue"
import "../styles/Cabinet.css"
import ModalInfo from "./UI/ModalWindows/ModalInfo"
import { useState,useEffect } from "react"
import OrderService from "../API/OrderService"


export default function SellOrderContainer(props) {

    const [Visible,SetVisible] = useState(false)
    const [Details,SetDetails] = useState({})
    const [StatusArray,SetStatusArray] = useState([])
        
    useEffect(()=> {
        const NewStatusArray = []
        props.Orders.map(x=> {
            NewStatusArray[x.id] = x.status
        })
        SetStatusArray(NewStatusArray)
    },[])

    return (  <div className="SellOrderContainer">
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
              <div className="StatusText"> {
                StatusArray[x.id] !== undefined ?
              <InputValue maxLength={30} defaultValue={StatusArray[x.id]} onBlur={ async (e)=> {
                if (e.target.value !== "") {
                    const IsRemoved = await OrderService.SetStatusOrder(x.id,e.target.value)
                    if (!IsRemoved) 
                    SetStatusArray(prevState => {
                        const updatedStatusArray = prevState.map((value,index) => {
                            if (index === x.id) {
                                return e.target.value;
                            }
                            return value;
                        });
                        return updatedStatusArray;
                    });
                    else props.RemoveOrder(x.id)
                } else e.target.value = StatusArray[x.id]
              }} /> : ""
              }
              </div>
              <div onClick={()=> {
                    props.RemoveOrder(x.id)
              }} className="DeleteButton">
                  Удалить
              </div>
               
               </div>
          </div>
      </div> ))  : ""}
    
</div>)
}