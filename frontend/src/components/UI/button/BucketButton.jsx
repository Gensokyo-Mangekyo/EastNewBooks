import "./button.css"
export default function BucketButton({children, ...props}) {
    return <div {...props}className="BucketButton">{children}</div>
}