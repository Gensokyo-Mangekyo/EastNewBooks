import "../styles/Publishers.css"
import PublisherService from "../API/PublisherService"
import { useState,useEffect } from "react"
import InputValue from "./UI/input/InputValue"
import UsersService from "../API/UsersService"
import GlobalService from "../API/GlobalService"

export default function PublishersContainer(props) {

    const [Publishers,SetPublishers] = useState()
    const [IsRoot,SetIsRoot] = useState(false)
    const [Cursor,SetCursor] = useState({cursor: "auto"})
    

    async function DataPublishers() {
        const Data = await PublisherService.GetPublishers()
        const ArrayChanged =[]
        if (Data.length > 0) {
        Data.map(x=> {
            ArrayChanged[x.id] = {
                Id: x.id,
                Edit: false,
                Header: x.name,
                IsEdited: false,
                Description: x.description
            }
        })
       props.SetChanged(ArrayChanged)
        SetPublishers(Data)
    }
    }

    function onClick(id) {
        if (!IsRoot)
        return
        props.SetChanged(prevState => { 
            const UpdateState = prevState.map((value,index) => {
            if (index ===  id) {
                let NewValue  = value
                NewValue.Edit = true
                NewValue.IsEdited = true
                return NewValue
            }
            return value
        }) 
        return UpdateState
    }) 
    }

    function onFocusInit(e,value) {
        e.target.value = value
    }

    function ConfirmInput(e,id,Key) {
		if (e.key === 'Enter') {
            props.SetChanged(prevState => { 
                const UpdateState = prevState.map((value,index) => {
                if (index ===  id) {
                    let NewValue  = value
                    NewValue.Edit = false
                    NewValue[Key] = e.target.value
                    return NewValue
                }
                return value
            }) 
            return UpdateState
        }) 
	}
	} 

  async function SetRootUser() {
    let login = sessionStorage.getItem("UserLogin") 
    let password = sessionStorage.getItem("UserPassword")
    if (login && password)
       {
         const Role = await UsersService.GetRole(login,password)
         if (Role === "Адмнистратор" || Role === "Менеджер")
            SetIsRoot(true)
         return
       }
    login = GlobalService.getCookie("UserLogin")
    password = GlobalService.getCookie("UserPassword")
    if (login && password ) {
        const Role = await UsersService.GetRole(login,password)
         if (Role === "Адмнистратор" || Role === "Менеджер")
        SetIsRoot(true)
    }
    }

    async function RemovePublisherById(id) {
        await PublisherService.RemovePublisherById(id)
        SetPublishers(Publishers.filter(x => x.id !== id))
        props.SetChanged(props.Changed.filter(x => x.Id !== id))
    }
    
    useEffect(()=> {
        DataPublishers()
        SetRootUser()
    }, [])

    useEffect(()=> {
        if (IsRoot === true) {
            SetCursor({
                cursor: "pointer"
            })
        }
    },[IsRoot])

    return(<div className="PublishersMain" >
            <h1>Издатели</h1>
            {Publishers !== undefined ? Publishers.map(x=> <div id={x.id} className="PublisherItem" >
                <div onClick={()=> {
                    onClick(x.id)
                }} >
                { props.Changed[x.id].Edit === false ? <p style={Cursor} className="Header" >{props.Changed[x.id].Header}</p> : <div className="HeaderBlock"> <InputValue onFocus={(e)=> {onFocusInit(e,props.Changed[x.id].Header)}} onKeyDown={(e)=> {ConfirmInput(e,x.id,"Header")}} maxLength={30} /> </div> }
              
               { props.Changed[x.id].Edit === false ? <p style={Cursor} className="Description">{props.Changed[x.id].Description === null || props.Changed[x.id].Description === "" ? "Описание отсутсвует" : props.Changed[x.id].Description } </p> : <InputValue onFocus={(e)=> {onFocusInit(e,props.Changed[x.id].Description)}} onKeyDown={(e)=> {ConfirmInput(e,x.id,"Description")}} maxLength={500} /> }     
                </div>
               {IsRoot === true ? <div onClick={async ()=> await RemovePublisherById(x.id)} className="DeletePublisher" >
                    Удалить
                </div> : ""
                }
                </div>
                )
                : <div className="PublisherItem" ><p className="Header" >Издатели отсуствуют</p>   <p className="Description">Наверное их ещё не добавили</p>       </div> }            
    </div>)
}