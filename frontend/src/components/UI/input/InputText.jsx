import { useEffect } from "react"
import "./input.css"
export default function InputText({Change, ...props}) {

    useEffect(() => {
        Change(false)
    },[])

    return <input onChange={(e) => Change(e.target.value !== "")}  type="text" {...props} class="input-text" />
}