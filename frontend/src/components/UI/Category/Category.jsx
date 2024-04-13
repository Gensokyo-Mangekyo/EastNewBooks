import "./Category.css"
import icon from "../../../images/Category.png"

export default function Category(props) {
    return (	
    <div class="CategoryConatainer">
    <div class="HeaderCategory"> <img src={icon} class="CategoryIcon" /> <span>Категории</span> </div>
   <ul class="CategoryList">
    {props.List.map((x,id)=> <li key={x.Id} onClick={x.Click} class="CategoryItem" >{x.Name}</li> )}
   </ul>
 </div>)

}