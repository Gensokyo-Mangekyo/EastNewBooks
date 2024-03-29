import { useParams} from "react-router-dom";
import { useState,useEffect } from "react";
import BooksService from "../API/BooksService";
import Nav from "../components/UI/Nav/Nav";
import { useNavigate } from "react-router-dom";
import AdminNav from "../components/UI/Nav/AdminNav";
import Search from "../components/UI/Search/Search";
import BookInformation from "../components/Books/BookInfromation";


export default function ShowInfoBook() {
    const [Query,SetQuery] = useState("")
    const navigate = useNavigate();
    const  { id } = useParams() 
    const [Book,SetBook] = useState(null)
    const [DataBook,SetDataBook] = useState(null)

    async function GetBook() {
      const  DataBook = await BooksService.GetBookById(id);
      SetBook(DataBook)
      SetDataBook(DataBook)
    }

    useEffect(()=>{
      GetBook()
    },[])

    function DataBookCallback(Data) {
      SetDataBook(Data)
    }

      return(

        <div>
             <Nav Navigate = {[{
            Link: "/",Name: "Главная" },
           {Link: "/",Name: "Корзина" }, 
           {Link: "/",Name: "Оформить заказ"},
           {Link: "/",Name: "Контакты"},
           {Link: "/",Name: "Личный кабинет"},
           ]} />

           <AdminNav Navigate={[
            {
              Click: async (e)=> {
                const UpdatedBook = {
                  Id: Book.id,
                  Name: DataBook.name.Value,
                  Pages: DataBook.pages.Value,
                  Price: DataBook.price.Value,
                  Url: Book.url,
                  Year: DataBook.year.Value,
                }
                  await BooksService.UpdateBook(UpdatedBook)
                  navigate("/")
              },
              Name: "Сохранить изменения"
            },
            {
              Click: async (e)=> {
                 const response = await BooksService.DeleteBookById(Book.id);
                  if (response) {
                    navigate("/")
                  }
              },
              Name: "Удалить книгу"
            },
            {
              Click: (e)=> {
                alert("Индентификатор равен " + Book.id)
              },
              Name: "Узнать номер"
            },
           ]} />

<Search Change = {(e)=> {
        SetQuery(e.target.value)
       }} Click={(e)=> {
        const searchUrl = `/SearchBooks/` + Query;
        navigate(searchUrl)
       }} />

        { Book ? <BookInformation SetNewDataBook = {DataBookCallback}  book= {Book} /> : <p>Загрузка...</p> }
        </div>
        
    
      )
}
