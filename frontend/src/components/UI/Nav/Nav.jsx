import "./Nav.css"
import Link from "react-router-dom"

export default function Nav(props) {
    return (
        <nav className="MainNav">
        <ul>
            {props.Navigate.map((x,index) =>  <li key={index}>
            <a href={x.Link}>{x.Name} </a>  
                        </li> )}
        </ul>
    </nav>
    )
}