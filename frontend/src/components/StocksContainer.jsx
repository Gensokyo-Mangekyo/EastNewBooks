import InputValue from "./UI/input/InputValue"
import "../styles/Cabinet.css"
import ModalInfo from "./UI/ModalWindows/ModalInfo"
import { useState,useEffect } from "react"
import GlobalService from "../API/GlobalService"
import * as XLSX from 'xlsx';
import StockService from "../API/StockService"


export default function StocksContainer(props) {

    const [Visible,SetVisible] = useState(false)
    const [Details,SetDetails] = useState({})
    const [CountArray,SetCountArray] = useState([])
    const [Sales,SetSales] = useState([])
        
    useEffect(()=> {
        const NewCountArray = []
        const Sales = []
        props.Stocks.map(x=> {
            NewCountArray[x.id] = x.count
            Sales[x.id] = x.sales
        })
        SetCountArray(NewCountArray)

        SetSales(Sales)
    },[])


    return (  <div className="SellOrderContainer">
       {Visible === true ? <ModalInfo SetVisible={SetVisible} >
        <div className="HeaderModal">
            Информация о книги с №{Details.id}
        </div>
        <div className="ModalText" >
            Автор: {Details.author}
        </div>
        <div className="ModalText" >
            Страницы: {Details.pages}
        </div>
        <div className="ModalText" >
            Год выпуска: {Details.year}
        </div>
        </ModalInfo> : "" } 
        {props.Stocks !== undefined ? 
            props.Stocks.map(x=> (
          <div id={x.id} className="ItemSellOrder">
          <div className="LeftSellOrder" >
          <div className="BookForSale"> {x.book.name}</div>
          <div className="Phone">Цена за шт</div>
          <div className="StadartText">{x.book.price}₽</div>
          <div onClick={()=>{ SetDetails({
            id: x.id,
            author: x.book.author,
            pages: x.book.pages,
            year: x.book.year,
          }); SetVisible(true) } } className="DetailsButton">
                  Подробнее
              </div>
          </div>
          <div>
          <div className="BooksOrders">
              <p className="BookHeader">Продажи</p>
              <div className="AllBookInOrder" >
                    { Sales[x.id] !== undefined ? Sales[x.id].map(x=> (
                            <div className="BlockBook" >
                            <p className="Date"> {x.date}</p>
                            <p className="SellPrice">{x.price}₽</p>
                            <div onClick={ async ()=> {
                                await StockService.RemoveSellById(x.id)
                                SetSales(Sales.filter((a,index)=> index !== x.id ))
                            }} className="RemoveSellButton" >Удалить</div>
                            </div>
                    )) : ""}
              </div>
              </div>
          </div>
          <div>
          <div className="FunctionsOrder" >
              <p className="StatusOrder" >Осталось</p>
              <div className="StatusText"> {
                CountArray[x.id] !== undefined ?
              <InputValue maxLength={6} defaultValue={CountArray[x.id]} onBlur={ async (e)=> {
                if (GlobalService.IsNumberValue(e)) {
                    const IsSuccess = await StockService.ChangeStock(x.id,e.target.value)
                    if (!IsSuccess)
                    return
                    SetCountArray(prevState => {
                        const updatedStatusArray = prevState.map((value,index) => {
                            if (index === x.id) {
                                return e.target.value;
                            }
                            return value;
                        });
                        return updatedStatusArray;
                    });
                } else { 
                    e.target.value = CountArray[x.id]
                }
              }} /> : ""
              }
              </div>
              <div onClick={()=> {
                   const data = [
                    ["Имя","Фамилия","Телефон","Дата","Цена"]
                  ];
                  let sum = 0
                  x.sales.map(x=> {
                  data.push([x.user.name,x.user.surname, x.user.phone, x.date,x.price + "₽"],)
                  sum += x.price
                  })
                  data.push(["","","","","Итого: " + sum + "₽"])
           
                  const wb = XLSX.utils.book_new();
                
                  const ws = XLSX.utils.aoa_to_sheet(data);
                              
                
                  ws['!cols'] = [{ wpx: 100, }, { wpx: 120 }, { wpx: 80 },{ wpx: 60 },{ wpx: 130 }]; 
                  ws['!rows'] = [{ hpx: 30 }];
             
                  XLSX.utils.sheet_add_json(ws, [
                  ], { skipHeader: true, origin: 'A2' });
              
          
                  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

                  const name = "Отчёт по продажам " + x.book.name
                  XLSX.writeFile(wb,  name + ".xlsx");
              }} className="DeleteButton">
                  Отчёт Excel
              </div>
               
               </div>
          </div>
      </div> ))  : ""}
    
</div>)
}