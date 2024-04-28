import LabelText from "./UI/label/LabelText"
import Button from "./UI/button/Button"
import LabelRef from "./UI/label/LabelRef"
import InputValue from "./UI/input/InputValue"
import OpenEye from "../images/OpenEye.png"
import CloseEye from "../images/ClosedEye.png"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import UsersService from "../API/UsersService";
import GlobalService from "../API/GlobalService"


export default function AuthContainer(props) {
 const [PasswordBox,SetPasswordBox] = useState({
        Image: CloseEye,
        Type: "password"
    })
  const [Login,SetLogin] = useState("")
  const [Password,SetPassword] = useState("")
  const [Error,SetError] = useState(false)
  const [Cookie,SetCookie] = useState(false)
  const navigate = useNavigate()
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
                 GlobalService.setCookie("UserLogin",Login,-1)
                  GlobalService.setCookie("UserPassword",Password,-1)
                           const StatusCode = await UsersService.IsExistUser(Login,Password)
                           if (StatusCode === 200) {
                           if (Cookie) {
                           GlobalService.setCookie("UserLogin",Login,30)
                           GlobalService.setCookie("UserPassword",Password,30)
                           }
                           else {
                            sessionStorage.setItem("UserLogin",Login)
                            sessionStorage.setItem("UserPassword",Password)
                           }
                           const Url = await UsersService.GetUrl(Login,Password)
                           navigate(Url)
                           }
                       else SetError(true)
                 }}>Авторизоваться</Button>
                 </div>
                 <div className="RememberMe" ><input onChange={(e)=> {
                    GlobalService.SetCookie(e.target.checked)
                 }} type="checkbox" /> <span>Запомнить меня</span> </div>
                    <div className="AuthButton" >
                    <LabelRef onClick={()=> {
                      navigate("/reg")
                    }} >Регистрация</LabelRef>
                    </div>
                
            </div>
        )
}