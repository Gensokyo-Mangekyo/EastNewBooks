import Search from "../components/UI/Search/Search";
import Nav from "../components/UI/Nav/Nav";
import AdminNav from "../components/UI/Nav/AdminNav";
import BooksContainer from "../components/BooksContrainer";
import FieldsContainer from "../components/FieldsContainer";
import BooksService from "../API/BooksService";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function Main() {

  const [AdminPanel,SetAdminPanel] = useState(null)
  const [Books,SetBooks] = useState([])
  const [Query,SetQuery] = useState("")
  const [ErrorPost,SetErrorPost] = useState("")
  const navigate = useNavigate();


  const SetValueFieldsCallback = async (value) => { 
    const JsonData = {
      Name: value[0],
      Price: value[1],
      Pages: value[2],
      Year: value[3],
      Url: value[4],
    }
   const Result = await BooksService.AddBook(JsonData)
   if (Result.error) {
    SetErrorPost(Result.error)
    
   }
   else {
    const NewBooks = [...Books].push(Result)
    SetBooks(NewBooks)
    SetAdminPanel(null)
   }
  }

  async function GetBooks() {
    const Books = await BooksService.GetBooks();
    if (Books)
    SetBooks(Books)
  }

  useEffect( ()=> {
   GetBooks()
    },[])

  return (
    <div>
           <Nav Navigate = {[{
      Link: "/",Name: "Главная" },
     {Link: "/",Name: "Корзина" }, 
     {Link: "/",Name: "Оформить заказ"},
     {Link: "/",Name: "Контакты"},
     {Link: "/",Name: "Личный кабинет"},
     ]} />
    
    {AdminPanel !== null ? AdminPanel :    <AdminNav Navigate = {[
      {
        Click: (e) => { 
          SetAdminPanel( <FieldsContainer Error={ErrorPost} SetValueFields = {SetValueFieldsCallback} Cancel = {(e) => {SetAdminPanel(null)}} Name="Добавление книги" Fields = {[
            {Name: "Наименование", Attributes: {
              maxLength: 100
            },
           },
          {Name: "Цена", Attributes: {
            maxLength: 5
          },
          },
          {Name: "Страницы", Attributes: {
            maxLength: 4
          },
          },
          {Name: "Год", Attributes: {
            maxLength: 4
          },
          },
          {Name: "Изображение", Type: "DropImage"}
     ]} TextButton = "Добавить новую книгу"  />)
        },
        Name: "Добавить книгу"
       },
       {
        Click: (e) => { SetAdminPanel(<FieldsContainer Error={ErrorPost} Cancel = {(e) => {SetAdminPanel(null)}}  TextButton = "Удалить книгу"  Name="Удаление книги" Fields = {[ {Name: "Идентификатор", Attributes: {
          maxLength: 100
        },
       },]} /> ) 
      },
        Name: "Удалить книгу"
       },
     ]} ></AdminNav>}
     <Search Change = {(e)=> {
      SetQuery(e.target.value)
     }} Click={(e)=> {
      const searchUrl = `/SearchBooks/` + Query;
      navigate(searchUrl)
     }} />
    
    <BooksContainer Default="Возникли технические неполадки с сервисом!" Name ="Главная" Books = {Books} />
    </div>
  );
}

