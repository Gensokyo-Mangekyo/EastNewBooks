import "../styles/Order.css"
import InputValue from "./UI/input/InputValue"
import LabelText from "./UI/label/LabelText"
import img from "../images/c_4_0.jpg"
import GlobalService from "../API/GlobalService"
import OrderService from "../API/OrderService"
import { useState } from "react"


export default function OrderContainer(props) {

    const [OrderData,SetOrderData] = useState({
        Address: "",
        City: "",
        Index: ""
    })

    function ChangeValue(key,value) {
        const NewOrderData = OrderData
        NewOrderData[key] = value
        SetOrderData(NewOrderData)
    }

   async function SendOrder() {

        const BooksOrder =[]

        props.Bucket.map(x=> {
            BooksOrder.push({
                BookId: x.bookId,
                Count: x.count
            })
        })

        const Order = {
           OrderBooks: BooksOrder,
            User: props.User,
            UserId: props.User.id,
            Id: 0,
            DepartureDate: GlobalService.getFormattedDate(),
            Status: "Ожидается",
            Address: OrderData["Address"],
            City: OrderData["City"],
            Index: OrderData["Index"],
        }

        const Errors = ["Заполните адрес!", "Заполните населённый пункт!","Заполните индекс!"]
        const Fields = [OrderData["Address"],OrderData["City"],OrderData["Index"]]

        for (let i = 0; i < Fields.length; i++) {
            if (Fields[i] === "") {
                await props.Result(Errors[i])
                return
            }
        }
        const ResponseOrder = await OrderService.AddOrder(Order)
        await props.Result()
    }

    return (<div className="OrderMain" >
          <h1>Оформление заказа</h1>
          <div className="OrderContainer" >
            <div className="DataContainer" >
                <LabelText>Населённый пункт</LabelText>
                <InputValue maxLength={95} onChange={(e)=> {ChangeValue("City",e.target.value) }} />
                <LabelText>Адрес</LabelText>
                <InputValue maxLength={95} onChange={(e)=> {ChangeValue("Address",e.target.value) }}  />
                <LabelText>Почтовый индекс</LabelText>
                <InputValue onChange={(e)=> {
                    GlobalService.NumberValue(e,"Index",OrderData,SetOrderData)
                }} maxLength={95}  />
                <div className="SellerText" >Для оплаты заказа с вами свяжется продавец</div>
                <div className="SendOrder" onClick={SendOrder} >Отправить заказ</div>
            </div>
            <div className="OrderInformation" >
                {
                    props.Bucket !== undefined 
                    ? 
                    <div>  
                        <p className="HeaderOrder"> Ваш Заказ </p>
                    <div className="OrderList">
                        {
                            props.Bucket.map(x=> (
                                <div className="ElementBucket">
                                <p className="NameBook">{x.name}</p>
                                <p className="PriceElement">{x.price}₽ x {x.count}</p>
                            </div>
                            ))
                        }
                    </div>
                    <div className="SumText" >Итоговая сумма</div>
                    <div className="SumPrice" >{props.Sum}₽</div> 
                    </div> 
                    :   
                    <p className="HeaderOrder">Подождите</p>
                } 
            </div>
            </div>
    </div>)
}