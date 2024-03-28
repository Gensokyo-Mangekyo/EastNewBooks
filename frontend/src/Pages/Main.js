import Search from "../components/UI/Search/Search";
import Nav from "../components/UI/Nav/Nav";
import AdminNav from "../components/UI/Nav/AdminNav";
import BooksContainer from "../components/BooksContrainer";
import FieldsContainer from "../components/FieldsContainer";
import BooksService from "../API/BooksService";
import { useState,useEffect,createContext } from "react";
import { useNavigate } from "react-router-dom";


export default function Main() {

  const [AdminPanel,SetAdminPanel] = useState(null)
  const [Books,SetBooks] = useState(undefined)
  const [Query,SetQuery] = useState("")
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
   if (Result === undefined)
   {
    return "Произошла ошибка при добавлении!"
   }
   if (Result.error) {
    return Result.error
   }
   else {
    const NewBooks = [...Books].push(Result)
    Books.push(Result)
    SetBooks(NewBooks)
    SetAdminPanel(null)
   }

  }

  const DeleteBook = async(value) => {
    const StatusCode = await BooksService.DeleteBookById(value[0])
   if (StatusCode !== 200) {
    return "Не удалось удалить книгу с идентификатором " + value[0] + "!"
   }
   else {
    await GetBooks()
    SetAdminPanel(null)
   }
  }


  async function GetBooks() {
    const Books = await BooksService.GetBooks();
    if (Books) {
    SetBooks(Books)
    return Books
    }
  }

  useEffect( ()=> {
    GetBooks()
    const intervalId = setInterval( async () => {
      const IsBooks = await GetBooks()
      if (IsBooks)
      clearInterval(intervalId);
    }, 2000);

    return () => {
      clearInterval(intervalId); // Очистка интервала перед размонтированием компонента
    };

    },[])

  return (
    <div>
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
      Link: "/",
      Name: "Личный кабинет"
     },
     ]} />
    
    {AdminPanel !== null ? AdminPanel :    <AdminNav Navigate = {[
      {
        Click: (e) => { 
          SetAdminPanel( <FieldsContainer SetValueFields = {SetValueFieldsCallback} Cancel = {(e) => {SetAdminPanel(null)}} Name="Добавление книги" Fields = {[
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
        Click: (e) => { SetAdminPanel(<FieldsContainer SetValueFields = {DeleteBook}  Cancel = {(e) => {SetAdminPanel(null)}}  TextButton = "Удалить книгу"  Name="Удаление книги" Fields = {[ {Name: "Идентификатор", Attributes: {
          maxLength: 100
        },
       },]} /> ) 
      },
        Name: "Удалить книгу"
       },
     ]} ></AdminNav>}
     <Search Change = {(e)=> {
      SetQuery(e.target.value)
     }}  Click={(e)=> {
          const searchUrl = `/SearchBooks/` + Query;
          navigate(searchUrl)
     }} />
    
    <BooksContainer Default="Доступных книг в продаже нет!" Name ="Главная" Books = {Books} />
    </div>
  );
}

