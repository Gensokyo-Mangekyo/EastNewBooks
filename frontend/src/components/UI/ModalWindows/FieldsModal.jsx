import module from "./ModalWindows.module.css"

export default function FieldsModal({children,visible,setVisible}) {

    const rootClasses = [module.ModalWindow]

    if (visible) rootClasses.push(module.Active)

    return(
        <div className= {rootClasses.join(' ') } onClick={()=> {setVisible(false)}} >
                <div className={module.Content} onClick={(e)=> {e.stopPropagation()}} >
                        {children}
                </div>
        </div>
    )

}