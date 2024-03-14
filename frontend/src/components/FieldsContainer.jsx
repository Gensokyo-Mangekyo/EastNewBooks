import Field from "../components/Field";
import Button from "./UI/button/Button";

export default function FieldsContainer(props) {
    return <div className="FieldsContainer">
        <h1>{props.Name}</h1>
            <div className="FieldElements">
               {props.Fields.map(x=> {
                 return  <Field Name={x.Name} InputAttributes = {x.Attributes} ></Field>
               }) }
                 
                 </div>
                 <div className="FieldsContainerButtons">
                
                 <Button  onClick={props.Click}>{props.TextButton}</Button>
               
             
                 <Button  onClick={props.Cancel}>Отмена</Button>
            
                 </div>
        </div>
}