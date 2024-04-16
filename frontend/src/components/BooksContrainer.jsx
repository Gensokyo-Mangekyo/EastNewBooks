import BookCard from "./Books/BookCard"
import { useState,useEffect } from "react"

export default function BooksContainer(props) {

    const [showMessage, setShowMessage] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            if (props.Books === undefined) setShowMessage("Упс! Сервер упал :(")
        }, 200);
        return () => clearTimeout(timer);
    }, []); 
    
    return(
        <div className="BooksContainer">
           <h1>{props.Name}</h1>
           <div className="FlexContainer" > 
            {
            props.Books === undefined ? <div style={{height: 500, textAlign: "center"}} ><h1 style={{color: "red", margin: 150}} >{showMessage} </h1></div>  :
            props.Books.length > 0 ? props.Books.map(x => {
              return  <BookCard key={x.id} Book = {x} ></BookCard>
            }):  <div style={{height: 500, textAlign: "center"}} ><h1 style={{color: "red", margin: 150}} >{props.Default} </h1></div>} 
            </div>
        </div>
    )
}