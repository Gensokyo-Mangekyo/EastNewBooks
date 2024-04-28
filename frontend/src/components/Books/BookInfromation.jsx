import BucketButton from "../UI/button/BucketButton"
import BooksService from "../../API/BooksService"
import { useEffect, useState } from "react"
import InputValue from "../UI/input/InputValue"
import UsersService from "../../API/UsersService"
import GlobalService from "../../API/GlobalService"
import "./Books.css"

export default function BookInformation(props) {

	const [ChangingValue,SetChangingValue] = useState({
		price: {Changing: false, Value: props.book.price },
		name: {Changing: false, Value: props.book.name },
		category: {Changing: false, Value: props.book.category },
		publisher:{Changing: false, Value: props.book.publisher },
		year: {Changing: false, Value: props.book.year },
		author: {Changing: false, Value: props.book.author },
		pages: {Changing: false, Value: props.book.pages },
		description: {Changing: false, Value: props.book.description }
	})

	async function SetInput(Key,Value) {
		const Data = GlobalService.GetLoginAndPassword()
		const Role = await  UsersService.GetRole(Data["Login"],Data["Password"])
		if (Role === "Продавец" || Role === "Администратор" || Role === "Менеджер") {
		const updatedValue = { ...ChangingValue }
		updatedValue[Key].Changing = Value
		SetChangingValue(updatedValue)
		if (Value === false) {
			props.SetNewDataBook(updatedValue)
		}
	}
	}

	function NumberValue(e,key) {
		if (e.target.value === "") {
			return;
		}
		let prevValue = ChangingValue[key].Value
		const NumbersValue = parseFloat(e.target.value)
		if (!isNaN(e.target.value))  
		{
			ChangingValue[key].Value = NumbersValue
		}
		else { 
			e.target.value = prevValue; 
		}
	}

	function Value(e,key) {
		ChangingValue[key].Value = e.target.value;
	}
	
	function ConfirmInput(e,Key) {
		if (e.key === 'Enter') {
			const updatedValue = { ...ChangingValue }
			updatedValue[Key].Changing = false
			SetChangingValue(updatedValue)
			props.SetNewDataBook(updatedValue)
		  }
	} 
	
	const UndefinedValue = {
		category: ChangingValue["category"].Value !== null ? <p onDoubleClick={() => {SetInput("category",true)}} >Категория: {ChangingValue["category"].Value}</p> : <p onDoubleClick={() => {SetInput("category",true)}} >Категория: Отсуствует</p>,
		publisher: ChangingValue["publisher"].Value !== null  ? <p onDoubleClick={() => {SetInput("publisher",true)}} >Издатель: {ChangingValue["publisher"].Value}</p> : <p onDoubleClick={() => {SetInput("publisher",true)}} >Издатель: Неизвестен</p>,
		description: ChangingValue["description"].Value !== "" ? <p onDoubleClick={() => {SetInput("description",true)}} >{ChangingValue["description"].Value}</p> : <p onDoubleClick={() => {SetInput("description",true)}} >Описание книги отсуствует</p>,
	}


	function UndefinedValueChange(Key,text,defaultText,Length) {
		if (ChangingValue[Key].Changing === true) {
			if (ChangingValue[Key].Value === null)
	UndefinedValue[Key] = <InputValue onKeyDown={(e)=> {ConfirmInput(e,Key)}} onBlur={(e)=> {SetInput(Key,false)}} maxLength={Length} onChange= {(e)=>{Value(e,Key)}} /> 
	else UndefinedValue[Key] = <InputValue onKeyDown={(e)=> {ConfirmInput(e,Key)}} onBlur={(e)=> {SetInput(Key,false)}} defaultValue={ChangingValue[Key].Value} maxLength={Length} onChange= {(e)=>{Value(e,Key)}} /> 
		}
		else UndefinedValue[Key] = ChangingValue[Key].Value !== null ? <p onDoubleClick={() => {SetInput(Key,true)}} >{text !== null ? text + ": " + ChangingValue[Key].Value : ChangingValue[Key].Value  }</p> : <p onDoubleClick={() => {SetInput(Key,true)}} >{defaultText}</p>
	}

	UndefinedValueChange("category","Категория","Категория: Отсуствует",25)
	UndefinedValueChange("publisher","Издатель","Издатель: Неизвестен",30)
	UndefinedValueChange("description",null,"Описание книги отсуствует",500)

	

    return(
        <div>
             <div className="container">
             <div className="primary">
             <div className="LeftPart">
             <img src={BooksService.host + "/" + props.book.url}/>
		      { ChangingValue["price"].Changing === false ?   <p onDoubleClick={()=> {
						SetInput("price",true)
				}} >{ChangingValue["price"].Value}₽</p> : <InputValue onKeyDown={(e)=> {ConfirmInput(e,"price")}} onBlur={(e)=> {SetInput("price",false)}} maxLength={5} defaultValue={ChangingValue["price"].Value} onChange= {(e)=>{NumberValue(e,"price")}} /> }
		        <BucketButton>В корзину</BucketButton>
              </div>
              <div className="RightPart">
		    <div className="HeaderBook">
		       { ChangingValue["name"].Changing === false ? <h1 onDoubleClick={()=>{SetInput("name",true)}}>
				{ChangingValue["name"].Value}</h1> : <InputValue onKeyDown={(e)=> {ConfirmInput(e,"name")}} onBlur={(e)=> {SetInput("name",false)}} maxLength={100} defaultValue={ChangingValue["name"].Value} onChange= {(e)=>{Value(e,"name")}} />  }
		        <hr/>
		    </div>
		    <div className="Info">
		     	{UndefinedValue["category"]} 
				 {UndefinedValue["publisher"]} 
		        { ChangingValue["pages"].Changing === false ?  <p onDoubleClick={() => {SetInput("pages",true)}} >Количество страниц: {ChangingValue["pages"].Value}</p> : <InputValue onKeyDown={(e)=> {ConfirmInput(e,"pages")}} onBlur={(e)=> {SetInput("pages",false)}} maxLength={4} defaultValue={ChangingValue["pages"].Value} onChange= {(e)=>{NumberValue(e,"pages")}} /> }
		       { ChangingValue["year"].Changing === false ? <p onDoubleClick={() => {SetInput("year",true)}}>Год выпуска: {ChangingValue["year"].Value} </p> : <InputValue onKeyDown={(e)=> {ConfirmInput(e,"year")}} onBlur={(e)=> {SetInput("year",false)}} maxLength={4} defaultValue={ChangingValue["year"].Value} onChange= {(e)=>{NumberValue(e,"year")}} /> }
			   { ChangingValue["author"].Changing === false ?  <p onDoubleClick={() => {SetInput("author",true)}} >Автор: {ChangingValue["author"].Value}</p> : <InputValue onKeyDown={(e)=> {ConfirmInput(e,"author")}} onBlur={(e)=> {SetInput("author",false)}} maxLength={25} defaultValue={ChangingValue["author"].Value} onChange= {(e)=>{Value(e,"author")}} /> }
		        <hr/>
		        <div className ="description">
		        {UndefinedValue["description"]}
		        </div>		
		    </div>
		</div>
            </div>
            </div>
        </div>
    )
}