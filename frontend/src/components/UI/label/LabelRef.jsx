import "./label.css"
export default function LabelRef({children, ...props}) {
    return <label {...props}className="label-ref">{children}</label>
}