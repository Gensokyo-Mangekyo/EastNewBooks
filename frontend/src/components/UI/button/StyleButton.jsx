import "./button.css"
export default function StyleButton({children, ...props}) {
    return <button {...props}className="StyleButton">{children}</button>
}