import { useParams} from "react-router-dom";
import { useState,useEffect } from "react";
import BooksService from "../API/BooksService";
import Nav from "../components/UI/Nav/Nav";
import { useNavigate } from "react-router-dom";
import Search from "../components/UI/Search/Search";
import BookInformation from "../components/Books/BookInfromation";


export default function ShowInfoBook() {
    const [Query,SetQuery] = useState("")
    const navigate = useNavigate();
    const  { id } = useParams() 
    const [Book,SetBook] = useState(null)

    async function GetBook() {
      const  DataBook = await BooksService.GetBookById(id);
      SetBook(DataBook)
    }

    useEffect(()=>{
      GetBook()
    },[])

      return(

        <div>
             <Nav Navigate = {[{
            Link: "/",Name: "Главная" },
           {Link: "/",Name: "Корзина" }, 
           {Link: "/",Name: "Оформить заказ"},
           {Link: "/",Name: "Контакты"},
           {Link: "/",Name: "Личный кабинет"},
           ]} />

<Search Change = {(e)=> {
        SetQuery(e.target.value)
       }} Click={(e)=> {
        const searchUrl = `/SearchBooks/` + Query;
        navigate(searchUrl)
       }} />

        { Book ? <BookInformation book= {Book} /> : <p>Загрузка...</p> }
        </div>
        
    
      )
}
