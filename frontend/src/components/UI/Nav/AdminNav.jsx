import "./Nav.css"

export default function AdminNav(props) {
    return (
        <nav>
        <ul className="AdminUl">
            {props.Navigate.map((x,index) =>  <li key={index}>
            <p onClick={props.Click}>{x.Name} </p>  
                        </li> )}
        </ul>
    </nav>
    )
}