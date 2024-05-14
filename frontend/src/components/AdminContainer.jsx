import InputValue from "./UI/input/InputValue";
import LabelText from "./UI/label/LabelText";
import { useState } from "react";
import UsersService from "../API/UsersService";
import GlobalService from "../API/GlobalService";



export default function AdminContainer() {

    const [User,SetUser] = useState({})
    const [Error,SetError] = useState("")
    const [RemoveError,SetRemoveError] = useState("")
    const [Color,SetColor] = useState({color: "red"})
    const [IdUser,SetIdUser] = useState(0)

    function SetValueUser(key,value) {
        const NewUser = {...User}
        NewUser[key] = value
        SetUser(NewUser)
    }

  async function AddNewUser() {

    SetColor({color: "red"})

        const ArrayFileds = [
            "Name",
            "Surname",
            "Login",
            "Password",
            "Phone",
            "Email",
            "Role"
        ]
        
        for (let i = 0; i < ArrayFileds.length; i++) {
            if (User[ArrayFileds[i]] === undefined)
            {
                console.log(ArrayFileds[i])
                SetError("Заполните все поля!")
                return
            }
        }

        if (User["Login"].length < 6) {
            SetError("Логин меньше 5 символов!")
            return
        }

        if (User["Password"].length < 6) {
            SetError("Пароль меньше 5 символов!")
            return
        }

        let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (!regex.test(User["Email"])) {
                  SetError("Неверно введена почта!")
                  return
                  }
                  regex = /^\d{10}$/;
                  if (!regex.test(User["Phone"])) {
                  SetError("Неверно введен телефон!")
                  return
                  }
                  const response = await UsersService.AddNewUser(User)
                  if (response["error"]) {
                  SetError(response["error"])
                  return 
                  }

                  SetColor({color: "green"})
                SetError("Успешно добавленно")
    }

    async function RemoveUser(id) {
        SetColor({color: "red"})
        const response = await UsersService.RemoveUser(id)
        if (response["error"]) {
            SetRemoveError(response["error"])
            return 
            }
            SetColor({color: "green"})
            SetRemoveError("Успешно удалён")
    }

    return (<div className="AdminContainer">
        <div className="Item">
                <LabelText>Имя</LabelText>
                <InputValue onBlur={(e)=> {
                    SetValueUser("Name",e.target.value)
                }} />
                <LabelText>Фамилия</LabelText>
                <InputValue onBlur={(e)=> {
                    SetValueUser("Surname",e.target.value)
                }}/>
                <LabelText>Логин</LabelText>
                <InputValue  onBlur={(e)=> {
                    SetValueUser("Login",e.target.value)
                }} />
                <LabelText>Пароль</LabelText>
                <InputValue onBlur={(e)=> {
                    SetValueUser("Password",e.target.value)
                }}  />
                <LabelText>Телефон</LabelText>
                <InputValue onBlur={(e)=> {
                    SetValueUser("Phone",e.target.value)
                }} />
                <LabelText>Почта</LabelText>
                <InputValue  onBlur={(e)=> {
                    SetValueUser("Email",e.target.value)
                }} />
                <LabelText>Роль</LabelText>
                <InputValue onBlur={(e)=> {
                    SetValueUser("Role",e.target.value)
                }} />
                <div className="GridBottom">
                <div className="AddUserButton" onClick={AddNewUser} >Добавить</div>
                <div style={Color} className="ErrorAdmin">{Error}</div>
                </div>
        </div>
        <div className="Item" >
        <LabelText>Идентификатор пользователя</LabelText>
                <InputValue onBlur={(e)=> {
                    if (GlobalService.IsNumberValue(e))
                        SetIdUser(e.target.value)
                    else e.target.value = ""
                }} />
                <div className="GridBottom">
                <div className="AddUserButton" onClick={()=> RemoveUser(IdUser)} >Удалить </div>
                <div style={Color} className="ErrorAdmin">{RemoveError}</div>
                </div>
        </div>
    </div>)
}