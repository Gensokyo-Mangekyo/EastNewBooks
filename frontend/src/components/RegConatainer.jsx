import LabelText from "./UI/label/LabelText"
import Button from "./UI/button/Button"
import InputValue from "./UI/input/InputValue"
import OpenEye from "../images/OpenEye.png"
import CloseEye from "../images/ClosedEye.png"
import { useState } from "react"
import UsersService from "../API/UsersService";


function setCookie(cookieName, cookieValue, expirationDays) {
  var d = new Date();
  d.setTime(d.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}


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

function RegisterValue(Key,Value) {
  const NewRegValue = RegValues
  RegValues[Key] = Value
  SetRegValues(NewRegValue)
}

        return(
            <div className="AuthContainer">
                  <h1>Регистрация</h1>
                 { Error !== "" ? <h2 className="AuthError">Error</h2> : ""} 
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
                <div className="AuthButton" >
                 <Button onClick = {async ()=> {
                 }}>Подтвердить</Button>
                 </div>
                 <div className="RememberMe" ><input onChange={(e)=> {
                    SetCookie(e.target.checked)
                 }} type="checkbox" /> <span>Запомнить меня</span> </div>                
            </div>
        )
}