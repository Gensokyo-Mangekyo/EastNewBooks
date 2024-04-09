import Search from "../components/UI/Search/Search";
import Nav from "../components/UI/Nav/Nav";
import AdminNav from "../components/UI/Nav/AdminNav";
import BooksContainer from "../components/BooksContrainer";
import FieldsContainer from "../components/FieldsContainer";
import BooksService from "../API/BooksService";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/UI/Pagination/Pagination";

export default function Main() {

  const [AdminPanel,SetAdminPanel] = useState(null)
  const [Books,SetBooks] = useState(undefined)
  const [Query,SetQuery] = useState("")
  const [Page,SetPage] = useState(1)
  const [LastPage,SetLastPage] = useState(1)
  const navigate = useNavigate();

  const SetValueFieldsCallback = async (value) => { 
    const JsonData = {
      Name: value[0],
      Price: value[1],
      Pages: value[2],
      Year: value[3],
      Url: value[4],
      Category: {
        Name: value[5],
      },
      Publisher: {
        Name: value[6],
      },
      Description: value[7]
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
    const NewBooks = [...Books]
    NewBooks.push(Result);
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

  async function GetBooks(NewPage) {
    let Books = null
    if (NewPage)
    Books = await BooksService.GetBooks(NewPage);
  else Books = await BooksService.GetBooks(Page);
    if (Books) {
    SetBooks(Books)
    return Books
    }
  }

  async function GetLastPage() {
    const Last = await BooksService.LastPage();
    SetLastPage(Last)
  }

  async function SetNewPage(NewPage) {
    SetPage(NewPage)
    await GetBooks(NewPage)
  }

  useEffect( ()=> {
  let IsBooks = GetBooks()
    if (IsBooks) {
      GetLastPage()
    }
    else {
    const intervalId = setInterval( async () => {
      IsBooks = GetBooks();
      if (IsBooks) {
      await GetLastPage()
      clearInterval(intervalId);
      }
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }

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
          SetAdminPanel( <FieldsContainer  ModalWindow={true} SetValueFields = {SetValueFieldsCallback} Cancel = {(e) => {SetAdminPanel(null);  }} Name="Добавление книги" Fields = {[
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
     ]} TextButton = "Добавить новую книгу"  > </FieldsContainer>)
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
     }}  Click={async (e)=> {
      const Symbols = ["#","?","/"," ","."]
      let CheckedSymbols = true
       Symbols.forEach(symbol => {
    if (Query.startsWith(symbol)) {
        CheckedSymbols = false;
        return; 
    }
});
          if(!CheckedSymbols || Query === "") return;
          const searchUrl = `/SearchBooks/` + Query;
         navigate(searchUrl)
     }} />
    
    <BooksContainer Default="Доступных книг в продаже нет!" Name ="Главная" Books = {Books} />
     <Pagination prev={ async (e)=>{ if (Page-1 === 0) 
     await SetNewPage(LastPage);
      else await  SetNewPage(Page-1)}} next={ async (e)=>{
      if (Page+1 > LastPage) await SetNewPage(1); else await SetNewPage(Page+1) 
     }}>{Page}</Pagination>
    </div>
  );
}