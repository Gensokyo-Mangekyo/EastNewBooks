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

export default function SellerCabinet() {

    const navigate = useNavigate()
    const [Container,SetContainer] = useState(<UserContainer/>)

    async function NavigateUser(navigate,login,password) {
        const Url = await UsersService.GetUrl(login,password)
           navigate(Url)
       }
        
    useEffect(()=>{
        let login = sessionStorage.getItem("UserLogin") 
        let password = sessionStorage.getItem("UserPassword")
        if (login && password)
           NavigateUser(navigate,login,password)
  
        login = GlobalService.getCookie("UserLogin")
        password = GlobalService.getCookie("UserPassword")
        if (login && password )
           NavigateUser(navigate,login,password)
      },[])

    return (<div>
        <Header/>
        <Nav Navigate = {GlobalService.Navigation} />
        <div className="CabinetGrid" >
        <Menu List={[{Click: ()=> {
            SetContainer(<UserContainer/>)
        }, Name: "Мои заказы" },
          {
            Click: ()=> {
                SetContainer(<SellOrderContainer/>)
            }, Name: "Заказы клиентов" 
          }   ]}  />
        <div className="CabinetMain" >
            <h1>Личный кабинет</h1>
            <div className="BlockDisplay">
            <img className="Avatar" src={AvatarImg} ></img>
            <p className="Welcome">Добро пожаловать</p>
            <div className="PersonContainer" >
                <p className="PersonInfo">Андрей</p>
                <p className="PersonInfo">Мирошниченко</p>
            </div>
            </div>
            {Container}
            </div>
        </div>
 
    </div>)
}