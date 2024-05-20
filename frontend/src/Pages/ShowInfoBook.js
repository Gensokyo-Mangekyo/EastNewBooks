import { useParams} from "react-router-dom";
import { useState,useEffect } from "react";
import BooksService from "../API/BooksService";
import Nav from "../components/UI/Nav/Nav";
import { useNavigate } from "react-router-dom";
import AdminNav from "../components/UI/Nav/AdminNav";
import Category from "../components/UI/Category/Category";
import BookInformation from "../components/Books/BookInfromation";
import GlobalService from "../API/GlobalService";
import Header from "../components/UI/Header/Header";
import Search from "../components/UI/Search/Search";


export default function ShowInfoBook() {
    const navigate = useNavigate();
    const  { id } = useParams() 
    const [Book,SetBook] = useState(null)
    const [Categories,SetCategories] = useState([])
    const [DataBook,SetDataBook] = useState(null)
    const [Query,SetQuery] = useState("")


    async function GetBook() {
      const  DataBook = await BooksService.GetBookById(id);
      SetBook(DataBook)
      SetDataBook(DataBook)
    }

    useEffect(()=>{
      GetBook()
      BooksService.GetCategories(SetCategories,navigate)
    },[])

    function DataBookCallback(DataBook) {

      const NewDataBook = {
        Id: Book.id,
        Name: DataBook.name.Value,
        Pages: DataBook.pages.Value,
        Price: DataBook.price.Value,
        Url: Book.url,
        Year: DataBook.year.Value,
        Author: DataBook.author.Value,
        Publisher: null,
        Category: null,
        Description: DataBook.description.Value
      }

      if (DataBook.publisher.Value)
      NewDataBook["Publisher"] = {Name: DataBook.publisher.Value}
      if (DataBook.category.Value)
      NewDataBook["Category"] = {Name: DataBook.category.Value}
      
      SetDataBook(NewDataBook)
    }

      return(

        <div>
          <Header/>
             <Nav Navigate = {GlobalService.Navigation} />

           <AdminNav Navigate={[
            {
              Click: async (e)=> {
                await BooksService.UpdateBook(DataBook)
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

            <Category List={Categories} />
        { Book ? <BookInformation SetNewDataBook = {DataBookCallback}  book= {Book} /> : <p>Загрузка...</p> }
        </div>
        
    
      )
}
