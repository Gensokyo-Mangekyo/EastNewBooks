import LabelText from "./UI/label/LabelText";
import InputText from "./UI/input/InputText"
import DropImage from "./UI/input/DropImage";
import { useState } from "react";

export default function Field(props) {
    let Input =  <InputText {...props.InputAttributes} />
    const [Image,SetImage] = useState("")



    function preventDefaults (e) {
        e.preventDefault();
        e.stopPropagation();
      }
    
  
    if (props.Type === "DropImage") Input = <DropImage Image= {Image}  onDragEnter={preventDefaults} onDragOver={preventDefaults} onDragLeave={preventDefaults} onDrop={(e)=> {
        preventDefaults(e)
        let dt = e.dataTransfer;
        let files = dt.files;
        if (files.length > 0) {
           let file = files[0];
           if (file.type.startsWith('image/')) {
               let reader = new FileReader();
               reader.readAsDataURL(file);
               reader.onload = function() {
                SetImage(reader.result);
                 
                 }
           }
        }

    }} />
    
    return <div className="Field">
        <LabelText>{props.Name}</LabelText>
        {Input}
    </div>
}