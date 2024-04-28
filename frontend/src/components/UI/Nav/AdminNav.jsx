import GlobalService from "../../../API/GlobalService"
import UsersService from "../../../API/UsersService"
import "./Nav.css"
import { useEffect,useState } from "react"

export default function AdminNav(props) {

    const [Show,SetShow] = useState(true)

async function LADNO(login,password) {
    const Role = await UsersService.GetRole(login,password)
        if (Role === "Менеджер" || Role === "Администратор" )
        SetShow(true)
    else
        SetShow(false)
}

    useEffect(()=> {
       const Data = GlobalService.GetLoginAndPassword()
       if (Data["Login"] && Data["Password"]) {
        LADNO(Data["Login"],Data["Password"])
       }
       else SetShow(false)
    },[])

    return (
        Show === true ?
        <nav>
        <ul className="AdminUl">
            {props.Navigate.map((x,index) =>  <li  key={index}>
            <p onClick={x.Click}>{x.Name} </p>  
                        </li> )}
        </ul>
    </nav>
    : ""
    )
}