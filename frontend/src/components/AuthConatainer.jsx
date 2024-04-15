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

export default function AuthContainer(props) {
 const [PasswordBox,SetPasswordBox] = useState({
        Image: CloseEye,
        Type: "password"
    })
  const [Login,SetLogin] = useState("")
  const [Password,SetPassword] = useState("")
  const [Error,SetError] = useState(false)
  const [Cookie,SetCookie] = useState(false)
        return(
            <div className="AuthContainer">
                  <h1>Авторизация</h1>
                 { Error === true ? <h2 className="AuthError">Неверный логин или пароль!</h2> : ""} 
                  <div className="AuthField" >
                  <LabelText >Логин</LabelText> <InputValue onChange={(e)=> {SetLogin(e.target.value)}}/>
                  </div>
                  <img alt="Глазик" onClick={(e) => {
                    if (PasswordBox.Type === "password") 
                  SetPasswordBox({Image: OpenEye,Type: "text"})
                    else SetPasswordBox({Image: CloseEye,Type: "password"})
                } } src={PasswordBox.Image} />
                  <div className="AuthField" >
                <LabelText>Пароль</LabelText> <InputValue type={PasswordBox.Type}  onChange={(e)=> {SetPassword(e.target.value) }}  />
                </div>
                <div className="AuthButton" >
                 <Button onClick = {async ()=> {
                  setCookie("UserLogin",Login,-1)
                  setCookie("UserPassword",Password,-1)
                           const StatusCode = await UsersService.IsExistUser(Login,Password)
                           if (StatusCode === 200) {
                           SetError(false)
                           if (Cookie) {
                           setCookie("UserLogin",Login,30)
                           setCookie("UserPassword",Password,30)
                           }
                           }
                       else SetError(true)
                 }}>Авторизоваться</Button>
                 </div>
                 <div className="RememberMe" ><input onChange={(e)=> {
                    SetCookie(e.target.checked)
                 }} type="checkbox" /> <span>Запомнить меня</span> </div>
            </div>
        )
}