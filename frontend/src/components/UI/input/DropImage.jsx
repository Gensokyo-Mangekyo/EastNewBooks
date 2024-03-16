import "./input.css"

export default function DropImage({Image, ...props}) {

    return <div className="DropImage"  {...props} >
           {Image !== "" ? <img src={Image} /> : ""} 
    </div>
}