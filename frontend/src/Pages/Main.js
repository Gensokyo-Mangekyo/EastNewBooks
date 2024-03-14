import Search from "../components/UI/Search/Search";
import Nav from "../components/UI/Nav/Nav";
import AdminNav from "../components/UI/Nav/AdminNav";
import BooksContainer from "../components/BooksContrainer";
import c_sharp from "../images/c_4_0.jpg"
import FieldsContainer from "../components/FieldsContainer";


export default function Main() {
  return (
    <div>
           <Nav Navigate = {[{
      Link: "/",
      Name: "Главная"
     },
     {
      Link: "/",
      Name: "О нас"
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
      Name: "Личный кабинет"
     },
     ]} />
       <AdminNav Navigate = {[
      {
        Click: () => {},
        Name: "Добавить книгу"
       },
       {
        Click: () => {},
        Name: "Удалить книгу"
       },
     ]} ></AdminNav>
     <Search Click={(e)=> {
        e.preventDefault()
     }} />
    <BooksContainer Name ="Главная" Books = {[
      {
        id: 1,
        url: c_sharp,
        name: "C# 4.0: полное руководство",
        pages: 1056,
        price: 820,
        year: 2011,
      }
    ]} />
    </div>
  );
}

