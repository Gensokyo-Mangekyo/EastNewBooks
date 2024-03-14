import LabelText from "./UI/label/LabelText";
import InputText from "./UI/input/InputText"

export default function Field(props) {
    return <div className="Field">
        <LabelText>{props.Name}</LabelText>
        <InputText {...props.InputAttributes} />
    </div>
}