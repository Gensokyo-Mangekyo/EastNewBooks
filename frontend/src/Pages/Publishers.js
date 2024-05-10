import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/UI/Nav/Nav";
import GlobalService from "../API/GlobalService";
import PublishersContainer from "../components/PublishersContainer";
import Header from "../components/UI/Header/Header";
import AdminNav from "../components/UI/Nav/AdminNav";
import PublisherService from "../API/PublisherService";

export default function Publishers() {

  const [Changed,SetChanged] = useState([])
  const navigate = useNavigate()

    return(
        <div>
            <Header/>
              <Nav Navigate = {GlobalService.Navigation} />
              <AdminNav Navigate={[
            {
              Click: async (e)=> {
                const DataUpdated = {
                  Publishers: []
                }
                Changed.filter(x=> x.IsEdited == true).map(x=> {
                  DataUpdated.Publishers.push({
                    Id: x.Id,
                    Name: x.Header,
                    Description: x.Description
                  })
                })
                await PublisherService.UpdatePublishers(DataUpdated)
                navigate("/")
              },
              Name: "Сохранить изменения"
            },
           ]} />
              <PublishersContainer SetChanged={SetChanged} Changed={Changed}  />
        </div>
    )
}