import { useEffect,useState } from "react"
import "./input.css"

export default function DropImage({Change,Image, ...props}) {

    const  [Changed,SetChanged] = useState(false)

    useEffect(() => {
       Change(false)
    },[])
    
    if (Image !== "" && Changed === false ) {
        SetChanged(true)
        Change(true)
    } 

    return <div  className="DropImage" {...props} >
           {Image !== "" ? <img src={Image} />  : ""} 
    </div>
}