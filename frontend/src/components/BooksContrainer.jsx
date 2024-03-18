import BookCard from "./Books/BookCard"

export default function BooksContainer(props) {

    
    return(
        <div className="BooksContainer">
           <h1>{props.Name}</h1>
           <div className="FlexContainer" > 
        
            {props.Books.length > 0 ? props.Books.map(x => {
              return  <BookCard key={x.id} Book = {x} ></BookCard>
            }):  <div style={{height: 500, textAlign: "center"}} ><h1 style={{color: "red", margin: 150}} >{props.Default}</h1></div> } 
            </div>
        </div>
    )
}