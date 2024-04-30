import { useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import Nav from "../components/UI/Nav/Nav";
import GlobalService from "../API/GlobalService";
import PublishersContainer from "../components/PublishersContainer";
import Header from "../components/UI/Header/Header";
import AdminNav from "../components/UI/Nav/AdminNav";

export default function Publishers() {

    const [Publishers,SetPublishers] = useState([])

  function UpdateCallback(Publisher) {
        const NewPublishers = Publishers
        NewPublishers[Publisher.Id] = Publisher
        SetPublishers(NewPublishers)
    }

    return(
        <div>
            <Header/>
              <Nav Navigate = {GlobalService.Navigation} />
              <AdminNav Navigate={[
            {
              Click: async (e)=> {
                
              },
              Name: "Сохранить изменения"
            },
           ]} />
              <PublishersContainer Update={UpdateCallback} />
        </div>
    )
}