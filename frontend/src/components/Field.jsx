import LabelText from "./UI/label/LabelText";
import InputText from "./UI/input/InputText"
import DropImage from "./UI/input/DropImage";
import { useState } from "react";

export default function Field(props) {
    let Input =  <InputText {...props.InputAttributes} Change = {props.Change} />
    const [Image,SetImage] = useState("")

    function preventDefaults (e) {
        e.preventDefault();
        e.stopPropagation();
      }
    
    if (props.Type === "DropImage") Input = <DropImage Change = {props.Change} Image= {Image}  onDragEnter={preventDefaults} onDragOver={preventDefaults} onDragLeave={preventDefaults} onDrop={(e)=> {
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
                 let readerBytes = new FileReader();
                 readerBytes.readAsArrayBuffer(file);
                 readerBytes.onload = function() {
                    const uint8 = new Uint8Array(readerBytes.result);
                    props.SetImageBytes(uint8.join(' '))
                    
                 }
           }
        }

    }} />
    
    return <div className="Field">
        <LabelText>{props.Name}</LabelText>
        {Input}
    </div>
}