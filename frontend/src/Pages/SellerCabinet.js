import Header from "../components/UI/Header/Header";
import Nav from "../components/UI/Nav/Nav";
import GlobalService from "../API/GlobalService";
import { useEffect,useState } from "react";
import UsersService from "../API/UsersService";
import { useNavigate } from "react-router-dom";
import AvatarImg from "../images/Avatar.png"
import SellOrderContainer from "../components/SellOrderContainer";
import UserContainer from "../components/UserContainer";
import Menu from "../components/UI/Menu/Menu";
import OrderService from "../API/OrderService";

export default function SellerCabinet() {

    const navigate = useNavigate()
    const [Container,SetContainer] = useState()
    const [IsSellOrder,SetIsSellOrder] = useState(true)
    const [User,SetUser] = useState()
    const [Orders,SetOrders] = useState()
    const [Sum,SetSum] = useState(0)
    async function NavigateUser(navigate,login,password) {
        const Url = await UsersService.GetUrl(login,password)
           navigate(Url)
        const User = await UsersService.GetUser(login,password)
        SetUser(User)
       }
        
    async function RemoveOrder(id) {
        await OrderService.RemoveOrder(id)
        const NewOrders = Orders.filter(x=> x.id !== id)
        SetOrders(NewOrders)
    }

    async function GetAllOrders() {
        const Orders = await OrderService.GetAllOrders()
        SetIsSellOrder(true)
        const sum = {}
        Orders.map(x=> {
            sum[x.id] = 0
                x.orderBooks.map(n=> {
                    sum[x.id] += n.price * n.count
                })
        })
        SetSum(sum)
        SetOrders(Orders)
    }

    useEffect(()=>{
        let login = sessionStorage.getItem("UserLogin") 
        let password = sessionStorage.getItem("UserPassword")
        if (login && password)
           NavigateUser(navigate,login,password)
           if (!login || !password) {
        login = GlobalService.getCookie("UserLogin")
        password = GlobalService.getCookie("UserPassword")
        if (login && password )
           NavigateUser(navigate,login,password)
        else navigate("/")
           }
           else    GetAllOrders()
      },[])
      
      useEffect(()=> {
        if (Orders !== undefined) {
            if (IsSellOrder === true)
        SetContainer(<SellOrderContainer RemoveOrder={RemoveOrder} Sum={Sum} Orders={Orders} />)
        else         SetContainer(<UserContainer RemoveOrder={RemoveOrder} Sum={Sum} Orders={Orders} />)
        }
      },[Orders])

    return (<div>
        <Header/>
        <Nav Navigate = {GlobalService.Navigation} />
        <div className="CabinetGrid" >
        <Menu List={[{Click: async ()=> {
              const ResponseOrders = await OrderService.GetOrdersById(User.id)
              SetIsSellOrder(false)
              const sum = {}
              ResponseOrders.map(x=> {
                  sum[x.id] = 0
                      x.orderBooks.map(n=> {
                          sum[x.id] += n.price * n.count
                      })
              })
              SetOrders(ResponseOrders)
              SetSum(sum)
        }, Name: "Мои заказы" },
          {
            Click: async ()=> {
                await GetAllOrders()
            }, Name: "Заказы клиентов" 
          }   ]}  />
        <div className="CabinetMain" >
            <div className="FlexSpace" >
            <h1>Личный кабинет</h1> 
            <div className="ExitButton" onClick={()=>{
                GlobalService.exit()
                navigate("/auth")
            }} >Выход</div>
            </div>
            <div className="BlockDisplay">
            <img className="Avatar" src={AvatarImg} ></img>
            {
                User !== undefined ? <div>
                      <p className="Welcome">Добро пожаловать</p>
            <div className="PersonContainer" >
                <p className="PersonInfo">{User.name}</p>
                <p className="PersonInfo">{User.surname}</p>
            </div>
                </div> :    <p className="Welcome">Подождите</p>
            }
          
            </div>
            {Container != undefined ? Container : ""}
            </div>
        </div>
 
    </div>)
}