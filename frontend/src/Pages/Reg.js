import { useState } from "react";
import Nav from "../components/UI/Nav/Nav";
import AdminNav from "../components/UI/Nav/AdminNav";
import AuthContainer from "../components/AuthConatainer";
import FieldsContainer from "../components/FieldsContainer";
import UsersService from "../API/UsersService";
import RegContainer from "../components/RegConatainer";

export default function Reg() {
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