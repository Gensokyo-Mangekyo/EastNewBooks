
import Nav from "../components/UI/Nav/Nav";
import AdminNav from "../components/UI/Nav/AdminNav";
import AuthContainer from "../components/AuthConatainer";


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
     <AdminNav Navigate={[{Click: async () => {

     }, Name: "Добавить пользователя" }]} />

     <AuthContainer/>
    </div>)
}