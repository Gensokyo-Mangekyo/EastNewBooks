import { useState,useEffect } from "react";
import Nav from "../components/UI/Nav/Nav";
import AdminNav from "../components/UI/Nav/AdminNav";
import AuthContainer from "../components/AuthConatainer";
import FieldsContainer from "../components/FieldsContainer";
import UsersService from "../API/UsersService";
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

export default function Auth() {

    const [UserPanel,SetUserPanel] = useState(false)
    const navigate = useNavigate();

    useEffect(()=>{
      const login = getCookie("UserLogin")
      const password = getCookie("UserPassword")
      if (login !== "" && password != "")
         navigate("/") 
    },[])

    async function SetValueFieldsCallback(value) {
      const DataUser = {
         Name: value[0],
         Surname: value[1],
         Login: value[2],
         Password: value[3],
         Email: value[4],
         Phone: value[5],
         Role: value[6]
      }

      let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(DataUser.Email))
      return "Неверно введена почта!"
      regex = /^\d{10}$/;
      if (!regex.test(DataUser.Phone))
      return "Неверно введен телефон!"

     const response = await UsersService.AddNewUser(DataUser)
     if (response["error"]) 
     return response["error"]
      SetUserPanel(false)
      }

    return(<div>
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
      { UserPanel === true ? <FieldsContainer SetValueFields = {SetValueFieldsCallback} Cancel = {(e) => {SetUserPanel(false)  }} TextButton = "Создать"  Name="Создание пользователя" Fields = {[
        {Name: "Имя", Attributes: {
            maxLength: 20
          },
         },
         {Name: "Фамилия", Attributes: {
            maxLength: 40
          },
         },
         {
            Name: "Логин"
         },
         {
            Name: "Пароль"
         },
         {
            Name: "Почта"
         },
         {
            Name: "Телефон"
         },
         {
            Name: "Роль"
         },
      ]}  /> :
     <AdminNav Navigate={[{Click: async () => {
        SetUserPanel(true)
     }, Name: "Создание пользователя" }]} /> }

     <AuthContainer/>
    </div>)
}