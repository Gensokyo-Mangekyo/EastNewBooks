import "./Books.css"
import BooksService from "../../API/BooksService"

export default function BookCard(props) {
    return(
        <div className="CardsFlex">
        <div className= "card">
          <img src={BooksService.host + "/" + props.Book.url} alt="Продукт"/>
          <p className = "NameCard">{props.Book.name}</p>
          <div className="ShortInfo">
           <span className="ReleaseDate">{props.Book.pages}c</span>
          <span className = "Price">{props.Book.price}₽</span>
          <span className="ReleaseDate">{props.Book.year}г</span>
          </div>  
        </div>
        </div>
    )
}