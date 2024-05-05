import "./ModalWindows.css"

export default function ModalInfo({children,...props}) {

    return(
        <div className="ModalWindow" onClick={()=> { props.SetVisible(false) }} >
            <div className="Content" onClick={(e)=> {e.stopPropagation()}} >
                        {children}
                </div>
        </div>
    )

}