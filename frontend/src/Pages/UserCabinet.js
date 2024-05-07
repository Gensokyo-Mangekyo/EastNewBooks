import { useState,useEffect } from "react"
import UsersService from "../API/UsersService"
import OrderService from "../API/OrderService"
import GlobalService from "../API/GlobalService"
import Header from "../components/UI/Header/Header"
import Nav from "../components/UI/Nav/Nav"
import { useNavigate } from "react-router-dom"
import UserContainer from "../components/UserContainer"
import AvatarImg from "../images/Avatar.png"

export default function UserCabinet() {

    const navigate = useNavigate()
    const [Orders,SetOrders] = useState()
    const [Sum,SetSum] = useState(0)
    const [User,SetUser] = useState()

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
        const Orders = await OrderService.GetOrdersById(User.id)
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
      },[])

      useEffect(()=> {
        if (User !== undefined)
        GetAllOrders()
      },[User])

    return (<div>
           <Header/>
           <Nav Navigate = {GlobalService.Navigation} />
           <div className="CabinetGrid" >
                <div></div>
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
            <UserContainer Orders={Orders} Sum={Sum} RemoveOrder={RemoveOrder} />
            </div>
            </div>
    </div>)
}