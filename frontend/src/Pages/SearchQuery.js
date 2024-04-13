import { useParams, useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import BooksService from "../API/BooksService";
import Nav from "../components/UI/Nav/Nav";
import BooksContainer from "../components/BooksContrainer";
import Pagination from "../components/UI/Pagination/Pagination";
import Search from "../components/UI/Search/Search";
import Category from "../components/UI/Category/Category";

export default function SearchQuery() {
    const navigate = useNavigate();
    const  { searchParam } = useParams() 
    const  [ search,setSearch ] = useState("")
    const [Books,SetBooks] = useState([])
    const [Query,SetQuery] = useState("")
    const [Page,SetPage] = useState(1)
    const [LastPage,SetLastPage] = useState(1)
    const [Categories,SetCategories] = useState([])

    async function SearchBooks(Query,page) {
        let Response = null;
        if (Query !== undefined) {
            setSearch(Query)
        Response = await BooksService.SearchBooks(Query,page);
        }
        else {
            setSearch(searchParam)
        Response = await BooksService.SearchBooks(searchParam);
        }
        if (Response.books)
        SetBooks(Response.books)
        if (page === undefined) {
        SetLastPage(Response.last)
        SetPage(Page=> 1)
        }
        else SetPage(page)
      }

    useEffect( ()=> {
        SearchBooks()
        BooksService.GetCategories(SetCategories,navigate)
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
            <Category List={Categories} />
            <Search Change = {(e)=> {
      SetQuery(e.target.value)
     }}  
     Click={async (e)=> {
      const Symbols = ["#","?","/"," ","."]
      let CheckedSymbols = true
       Symbols.forEach(symbol => {
    if (Query.startsWith(symbol)) {
        CheckedSymbols = false;
        return; 
    }
});
          if(!CheckedSymbols || Query === "") return;
          SearchBooks(Query)
     }} />
           <BooksContainer Default="По результат поиска ничего не было найдено!" Name ="Результат поиска" Books = {Books} />
           <Pagination prev={ async (e)=>{ if (Page-1 === 0) 
     await SearchBooks(search,LastPage);
      else  await SearchBooks(search,Page-1);}} next={ async (e)=>{
      if (Page+1 > LastPage) await SearchBooks(search,1); else await SearchBooks(search,Page+1);
     }}>{Page}</Pagination>
           </div>
           
    );

    
}