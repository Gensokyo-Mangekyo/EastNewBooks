import BookCard from "./Books/BookCard"

export default function BooksContainer(props) {
    const GetMesseage = function(Messeage) {
        return <div style={{height: 500, textAlign: "center"}} ><h1 style={{color: "red", margin: 150}} >{Messeage} </h1></div>
    }
    
    return(
        <div className="BooksContainer">
           <h1>{props.Name}</h1>
           <div className="FlexContainer" > 
            {
            props.Books === undefined ? GetMesseage("Возникли технические неполадки с сервисом!")  :
            props.Books.length > 0 ? props.Books.map(x => {
              return  <BookCard key={x.id} Book = {x} ></BookCard>
            }):  GetMesseage(props.Default)} 
            </div>
        </div>
    )
}