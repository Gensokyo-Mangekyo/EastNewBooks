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
    const [User,SetUser] = useState()
    async function NavigateUser(navigate,login,password) {
        const Url = await UsersService.GetUrl(login,password)
           navigate(Url)
        const User = await UsersService.GetUser(login,password)
        SetUser(User)
       }
        
    async function GetAllOrders() {
        const Orders = await OrderService.GetAllOrders()
        SetContainer(<SellOrderContainer Orders={Orders} />)
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

    return (<div>
        <Header/>
        <Nav Navigate = {GlobalService.Navigation} />
        <div className="CabinetGrid" >
        <Menu List={[{Click: ()=> {
            SetContainer(<UserContainer/>)
        }, Name: "Мои заказы" },
          {
            Click: async ()=> {
                await GetAllOrders()
            }, Name: "Заказы клиентов" 
          }   ]}  />
        <div className="CabinetMain" >
            <h1>Личный кабинет</h1>
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