
import Nav from "../components/UI/Nav/Nav";
import AdminNav from "../components/UI/Nav/AdminNav";
import AuthContainer from "../components/AuthConatainer";

export default function Auth() {
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
     <AdminNav Navigate={[{Click: () => {}, Name: "Добавить пользователя" }]} />

     <AuthContainer Name="Авторизация" />
    </div>)
}