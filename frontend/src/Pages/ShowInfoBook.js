import { useParams} from "react-router-dom";
import { useState } from "react";
import BooksService from "../API/BooksService";
import Nav from "../components/UI/Nav/Nav";
import { useNavigate } from "react-router-dom";
import Search from "../components/UI/Search/Search";
import BookInformation from "../components/Books/BookInfromation";
import image from "../images/c_4_0.jpg"


export default function ShowInfoBook() {
    const [Query,SetQuery] = useState("")
    const navigate = useNavigate();

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

       <BookInformation book= {{
        name: "a",
        pages: 13,
        year: 2204,
        price: 500,
        url: image
       }} />
        </div>
        
    
      )
}
