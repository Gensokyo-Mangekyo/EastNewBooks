import { useEffect } from "react";
import Nav from "../components/UI/Nav/Nav";
import RegContainer from "../components/RegConatainer";
import { useNavigate } from "react-router-dom";


function getCookie(cookieName) {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(';');
    for(var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return "";
  }

export default function Reg() {

    const navigate = useNavigate()

    useEffect(()=> {
        if (sessionStorage.getItem("UserLogin") && sessionStorage.getItem("UserPassword"))
         navigate('/UserCabinet')
         const login = getCookie("UserLogin")
         const password = getCookie("UserPassword")
         if (login !== "" && password !== "")
            navigate("/UserCabinet") 
      },[])

    return (<div>
         <Nav Navigate = {[{
      Link: "/",
      Name: "Главная"
     },
     {
      Link: "/",
      Name: "Корзина"
     },
     {
      Link: "/",
      Name: "Оформить заказ"
     },
     {
      Link: "/",
      Name: "Контакты"
     },
     {
      Link: "/Auth",
      Name: "Личный кабинет"
     },
     ]} />
     <RegContainer/>
    </div>)
}