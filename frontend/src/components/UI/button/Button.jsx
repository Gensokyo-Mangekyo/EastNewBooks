import "./button.css"
export default function Button({children, ...props}) {
    return <button {...props}class="button">{children}</button>
}