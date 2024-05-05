import "./Menu.css"
import icon from "../../../images/Category.png"


export default function Menu(props) {
    return(<div className="Menu" >
            <div class="HeaderMenu"> <img src={icon} class="MenuIcon" /> <span>Меню разделов</span> </div>
            <ul class="MenuList">
                {
                    props.List.map((x)=>  <li  class="MenuItem" > <span onClick={x.Click} >{x.Name} </span></li>)
                }
            </ul>
    </div>)
}