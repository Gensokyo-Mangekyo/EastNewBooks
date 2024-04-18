import "./Category.css"
import icon from "../../../images/Category.png"

export default function Category(props) {

    return (	
    <div class="CategoryConatainer">
    <div class="HeaderCategory"> <img src={icon} class="CategoryIcon" /> <span>Категории</span> </div>
   <ul class="CategoryList">
    {props.List.map((x)=> <li key={x.Id}  class="CategoryItem" > <span class="CategoryItemText" onClick={x.Click} >{x.Name} </span>  {props.Remove ? <span class="RemoveCategory" onClick={()=> { props.Remove(x.Id)}}>X</span> : "" }  </li>)}
   </ul>
 </div>)

}