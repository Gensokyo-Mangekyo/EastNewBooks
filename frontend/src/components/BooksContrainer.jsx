import BookCard from "./Books/BookCard"

export default function BooksContainer(props) {
    return(
        <div className="BooksContainer">
           <h1>{props.Name}</h1>
            {props.Books.map(x => {
              return  <BookCard key={x.id} Book = {x} ></BookCard>
            })}
        </div>
    )
}