import { useParams} from "react-router-dom";
import { useEffect,useState } from "react";
import BooksService from "../API/BooksService";
import Nav from "../components/UI/Nav/Nav";
import BooksContainer from "../components/BooksContrainer";
import { useNavigate } from "react-router-dom";
import Search from "../components/UI/Search/Search";


export default function SearchQuery() {
    const  { search } = useParams() 
    const [Books,SetBooks] = useState([])
    const [Query,SetQuery] = useState("")
    const navigate = useNavigate();

    async function SearchBooks() {
        const Books = await BooksService.SearchBooks(search) ;
        if (Books)
        SetBooks(Books)
      }

      <Search Change = {(e)=> {
        SetQuery(e.target.value)
       }} Click={(e)=> {
        const searchUrl = `/SearchBooks/` + Query;
        navigate(searchUrl)
       }} />

    useEffect( ()=> {
        SearchBooks()
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
           <BooksContainer Default="По результат поиска ничего не было найдено!" Name ="Результат поиска" Books = {Books} />
           </div>
           
    );

    
}