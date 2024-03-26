import Field from "../components/Field";
import Button from "./UI/button/Button";
import { useState } from "react";

export default function FieldsContainer(props) {

  const [childStates, setChildStates] = useState([]); //Массив состояний валидаций на пустые данные
  const [error, SetError] = useState(); 
  const [ImageBytes,SetImageBytes] = useState()
  const FieldsValueArray = []

  const ImageBytesCallback = function(NewImage) {
    SetImageBytes(NewImage)
  }
  
  const handleChildStateUpdate = (index, state) => {  //Callback функций для установки значения валидации
      const updatedChildStates = [...childStates];
      updatedChildStates[index] = state;
      setChildStates(updatedChildStates);
  };
    return <div className="FieldsContainer">
        <h1>{props.Name}</h1>
        {error !== undefined  ? <h2>{error}</h2> : ""}
            <div className="FieldElements">
               {props.Fields.map((x,index) => {
                 return  <Field SetImageBytes = {ImageBytesCallback}  Name={x.Name} Change = {(value)=> { handleChildStateUpdate(index,value)  }} InputAttributes = {x.Attributes} Type = {x.Type} ></Field>
               }) }
                 
                 </div>
                 <div className="FieldsContainerButtons">
                 <Button  onClick={function() {
                    for (const state of childStates) {
                      if (!state) {
                          SetError("Все данные должны быть заполнены!")
                          return;
                      }
                      if (typeof(state) === "string" || typeof(state) === "number")
                      FieldsValueArray.push(state)
                  }
                  if (ImageBytes)
                  FieldsValueArray.push(ImageBytes)
                 const Error =  props.SetValueFields(FieldsValueArray)
                 if (Error)
                  SetError("Данные числового типа не прошли проверку!")
                else
                  SetError(undefined)
                 } }>{props.TextButton}</Button>
               
             
                 <Button  onClick={props.Cancel}>Отмена</Button>
            
                 </div>
        </div>
}