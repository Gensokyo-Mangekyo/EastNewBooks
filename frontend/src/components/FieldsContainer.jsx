import Field from "../components/Field";
import Button from "./UI/button/Button";
import FieldsModal from "./UI/ModalWindows/FieldsModal";
import InputValue from "../components/UI/input/InputValue"
import LabelText from "../components/UI/label/LabelText";
import TextArea from "../components/UI/input/TextArea";
import StyleButton from "../components/UI/button/StyleButton";
import { useState } from "react";

export default function FieldsContainer(props) {

  const [childStates, setChildStates] = useState([]); //Массив состояний валидаций на пустые данные
  const [error, SetError] = useState(); 
  const [ImageBytes,SetImageBytes] = useState()
  const [Modal,SetModal] = useState(false)
  const [ExtraValue,SetExtraValue] = useState({})
  const FieldsValueArray = []
  
  const ImageBytesCallback = function(NewImage) {
    SetImageBytes(NewImage)
  }

  async function handleSetValueFields() {
    const Error = await props.SetValueFields(FieldsValueArray)
                 if (Error)
                  SetError(Error)
                  else
                  SetError(undefined)
  }

  function ChangeExtraValue (key,value) {
    const NewValue= {...ExtraValue,[key]: value}; 
    SetExtraValue(NewValue);
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

               {props.ModalWindow !== undefined ? <div>
                <FieldsModal visible={Modal} setVisible={SetModal}>
                <LabelText >Категория</LabelText> <InputValue maxLength={25} onChange={(e)=> {ChangeExtraValue("category",e.target.value)}}/>
                <LabelText>Издатель</LabelText> <InputValue maxLength={30} onChange={(e)=> {ChangeExtraValue("publisher",e.target.value)}}  /> 
                <LabelText>Описание</LabelText> <TextArea maxLength={255}  onChange={(e)=> { ChangeExtraValue("description",e.target.value)}} />
                 <StyleButton onClick = {(e)=> {SetModal(false); }}>Подтвердить</StyleButton>
                </FieldsModal>
                 <div className="ModalButtonContainer" ><Button onClick={()=> {
                      SetModal(true)
               }}>Дополнительные значения</Button></div> </div> : ""}
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
                  FieldsValueArray.push(ImageBytes)
                  FieldsValueArray.push(ExtraValue["category"])
                  FieldsValueArray.push(ExtraValue["publisher"])
                  FieldsValueArray.push(ExtraValue["description"])
                  handleSetValueFields()
                 } }>{props.TextButton}</Button>
               
             
                 <Button  onClick={()=> {props.Cancel(); console.log(ExtraValue)}}>Отмена</Button>
               
                 </div>
        </div>
}