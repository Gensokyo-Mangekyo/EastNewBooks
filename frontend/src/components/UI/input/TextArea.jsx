import "./input.css"

export default function TextArea({ClearValue ,...props}) {
    return <textarea {...props} className="input-text TextArea" />
}