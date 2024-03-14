import "./label.css"
export default function LabelText({children, ...props}) {
    return <label {...props}class="label-text">{children}</label>
}