import BucketButton from "../UI/button/BucketButton"
import "./Books.css"

export default function BookInformation(props) {
    return(
        <div>
             <div className="container">
             <div className="primary">
             <div className="LeftPart">
             <img src={props.book.url}/>
		        <p>{props.book.price}₽</p>
		        <BucketButton>В корзину</BucketButton>
              </div>
              <div className="RightPart">
		    <div className="HeaderBook">
		        <h1>{props.book.name}</h1>
		        <hr/>
		    </div>
		    <div className="Info">
		        {props.book.category !== undefined ? <p>Категория: {props.book.category}</p> : <p>Категория: Отсуствует</p>  }
		       {props.book.publisher !== undefined ? <p>Издатель: {props.book.publisher}</p>: <p>Издатель: Неизвестен</p>  }
		        <p>Количество страниц: {props.book.pages}</p>
		        <p>Год выпуска: {props.book.year} </p>
		        <hr/>
		        <div className ="description">
		        {props.book.description !== undefined ? props.book.description : "Описание книги отсуствует" }
		        </div>		
		    </div>
		</div>
            </div>
            </div>
        </div>
    )
}