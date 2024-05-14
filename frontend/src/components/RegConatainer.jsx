import LabelText from "./UI/label/LabelText"
import Button from "./UI/button/Button"
import InputValue from "./UI/input/InputValue"
import OpenEye from "../images/OpenEye.png"
import CloseEye from "../images/ClosedEye.png"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import UsersService from "../API/UsersService";
import GlobalService from "../API/GlobalService"

export default function RegContainer(props) {
 const [PasswordBox,SetPasswordBox] = useState({
        Image: CloseEye,
        Type: "password"
    })
  const [RegValues,SetRegValues] = useState({
    Name: null,
    Surname: null,
    Login: null,
    Password: null,
    Email: null,
    Phone: null,
    Role: "Пользователь"
  })
  const [Error,SetError] = useState("")
  const [Cookie,SetCookie] = useState(false)
  const navigate = useNavigate();

function RegisterValue(Key,Value) {
  const NewRegValue = RegValues
  RegValues[Key] = Value
  SetRegValues(NewRegValue)
}

        return(
            <div className="AuthContainer">
                  <h1>Регистрация</h1>
                 { Error !== "" ? <h2 className="AuthError">{Error}</h2> : ""} 
                 <div className="AuthField" >
                  <LabelText >Имя</LabelText> <InputValue onChange={(e)=> {RegisterValue("Name",e.target.value) }}/>
                  </div>
                  <div className="AuthField" >
                  <LabelText >Фамилия</LabelText> <InputValue onChange={(e)=> {RegisterValue("Surname",e.target.value) }}/>
                  </div>
                  <div className="AuthField" >
                  <LabelText >Логин</LabelText> <InputValue onChange={(e)=> {RegisterValue("Login",e.target.value) }}/>
                  </div>
                  <img alt="Глазик" onClick={(e) => {
                    if (PasswordBox.Type === "password") 
                  SetPasswordBox({Image: OpenEye,Type: "text"})
                    else SetPasswordBox({Image: CloseEye,Type: "password"})
                } } src={PasswordBox.Image} />
                  <div className="AuthField" >
                <LabelText>Пароль</LabelText> <InputValue type={PasswordBox.Type}  onChange={(e)=> {RegisterValue("Password",e.target.value) }}  />
                </div>
                <div className="AuthField" >
                <LabelText>Почта</LabelText> <InputValue  onChange={(e)=> {RegisterValue("Email",e.target.value) }}  />
                </div>
                <div className="AuthField" >
                  <LabelText>Телефон</LabelText> <InputValue  onChange={(e)=> {RegisterValue("Phone",e.target.value) }}  />
                  </div>
            
                <div className="AuthButton" >
                 <Button onClick = {async ()=> {
                  if (RegValues["Name"] === null || 
                  RegValues["Email"] === null || 
                  RegValues["Login"] === null ||
                  RegValues["Password"] === null ||
                  RegValues["Phone"] === null )
                  {
                    SetError("Все данные должны быть заполнены!")
                    return
                  }
                  
                  if (Cookie) {
                   GlobalService.setCookie("UserLogin",RegValues["Login"],30)
                   GlobalService.setCookie("UserPassword",RegValues["Password"],30)
                  }

                  if (RegValues["Login"].length < 6 ) {
                    SetError("Логин меньше 5 символов!")
                    return
                  }

                  if (RegValues["Password"].length < 6 ) {
                    SetError("Пароль меньше 5 символов!")
                    return
                  }

                  let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (!regex.test(RegValues["Email"])) {
                  SetError("Неверно введена почта!")
                  return
                  }
                  regex = /^\d{10}$/;
                  if (!regex.test(RegValues["Phone"])) {
                  SetError("Неверно введен телефон!")
                  return
                  }
                  const response = await UsersService.AddNewUser(RegValues)
                  if (response["error"]) {
                  SetError(response["error"])
                  return 
                  }
                  sessionStorage.setItem("UserLogin",RegValues["Login"])
                  sessionStorage.setItem("UserPassword",RegValues["Password"])
                  const Url = await UsersService.GetUrl(RegValues["Login"],RegValues["Password"])
                   navigate(Url)
                   
                 }}>Подтвердить</Button>
                 </div>
                 <div className="RememberMe" >
                  <input onChange={(e)=> {
                    SetCookie(e.target.checked)
                 }} type="checkbox" /> <span>Запомнить меня</span> </div>                
            </div>
        )
}