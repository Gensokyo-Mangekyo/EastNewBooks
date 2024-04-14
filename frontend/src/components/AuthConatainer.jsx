import LabelText from "./UI/label/LabelText"
import Button from "./UI/button/Button"
import InputValue from "./UI/input/InputValue"
import OpenEye from "../images/OpenEye.png"
import CloseEye from "../images/ClosedEye.png"
import { useState } from "react"

export default function AuthContainer(props) {
 const [PasswordBox,SetPasswordBox] = useState({
        Image: CloseEye,
        Type: "password"
    })
        return(
            <div className="AuthContainer">
                  <h1>{props.Name}</h1>
                  <div className="AuthField" >
                  <LabelText >Логин</LabelText> <InputValue onChange={(e)=> {}}/>
                  </div>
                  <img onClick={(e) => {
                    if (PasswordBox.Type === "password") 
                  SetPasswordBox({Image: OpenEye,Type: "text"})
                    else SetPasswordBox({Image: CloseEye,Type: "password"})
                } } src={PasswordBox.Image} />
                  <div className="AuthField" >
                <LabelText>Пароль</LabelText> <InputValue type={PasswordBox.Type}  onChange={(e)=> {}}  />
                </div>
                <div className="AuthButton" >
                 <Button onClick = {(e)=> {}}>Авторизоваться</Button>
                 </div>
                 <div className="RememberMe" ><input type="checkbox" /> <span>Запомнить меня</span> </div>

            </div>
        )
}