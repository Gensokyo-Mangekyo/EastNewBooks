import "./Books.css"
import BooksService from "../../API/BooksService"
import { Link } from "react-router-dom"

export default function BookCard(props) {
    return(
        <div className="CardsFlex">
        <Link to={"/Book/" + props.Book.id} >
        <div className= "card">
          <img src={BooksService.host + "/" + props.Book.url} alt="Продукт"/>
          <p className = "NameCard">{props.Book.name}</p>
          <div className="ShortInfo">
           <span className="ReleaseDate">{props.Book.pages}c</span>
          <span className = "Price">{props.Book.price}₽</span>
          <span className="ReleaseDate">{props.Book.year}г</span>
          </div>  
        </div>
        </Link>
        </div>
    )
}