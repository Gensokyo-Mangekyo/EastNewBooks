import "./label.css"
export default function LabelText({children, ...props}) {
    return <label {...props}className="label-text">{children}</label>
}