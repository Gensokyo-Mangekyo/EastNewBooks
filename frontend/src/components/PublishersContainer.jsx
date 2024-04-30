import "../styles/Publishers.css"
import PublisherService from "../API/PublisherService"
import { useState,useEffect } from "react"

export default function PublishersContainer() {

    const [Publishers,SetPublishers] = useState()

    async function DataPublishers() {
        const Data = await PublisherService.GetPublishers()
        SetPublishers(Data)
    }

    function onClick() {
        
    }

    useEffect(()=> {
        DataPublishers()
    }, [])

    return(<div className="PublishersMain" >
            <h1>Издатели</h1>
            {Publishers !== undefined ? Publishers.map(x=> <div id={x.id} className="PublisherItem" >
                <p className="Header" >{x.name}</p>  
               {x.description !== null ? <p className="Description">{x.description}</p> : <p className="Description">Описание отсутсвует</p>  }     
                </div>): <div className="PublisherItem" ><p className="Header" >Издатели отсуствуют</p>   <p className="Description">Наверное их ещё не добавили</p>       </div> }            
    </div>)
}