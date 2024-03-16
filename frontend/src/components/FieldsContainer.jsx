import Field from "../components/Field";
import Button from "./UI/button/Button";
import { useState } from "react";

export default function FieldsContainer(props) {

  const [childStates, setChildStates] = useState([]); //Массив состояний валидаций на пустые данные
  const [error, SetError] = useState(false); //Массив состояний валидаций на пустые данные
  
  const handleChildStateUpdate = (index, state) => {  //Callback функций для установки значения валидации
      const updatedChildStates = [...childStates];
      updatedChildStates[index] = state;
      setChildStates(updatedChildStates);
  };
    return <div className="FieldsContainer">
        <h1>{props.Name}</h1>
        {error ? <h2>Все данные должны быть заполнены!</h2> : ""}
            <div className="FieldElements">
               {props.Fields.map((x,index) => {
                 return  <Field  Name={x.Name} Change = {(value)=> { handleChildStateUpdate(index,value)  }} InputAttributes = {x.Attributes} Type = {x.Type} ></Field>
               }) }
                 
                 </div>
                 <div className="FieldsContainerButtons">
                
                 <Button  onClick={function() {
                    for (const state of childStates) {
                      if (!state) {
                          SetError(true)
                          return;
                      }
                  }
                  SetError(false)
                 } }>{props.TextButton}</Button>
               
             
                 <Button  onClick={props.Cancel}>Отмена</Button>
            
                 </div>
        </div>
}