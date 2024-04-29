import { useState,useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import Nav from "../components/UI/Nav/Nav";
import GlobalService from "../API/GlobalService";
import PublishersContainer from "../components/PublishersContainer";

export default function Publishers() {
    return(
        <div>
              <Nav Navigate = {GlobalService.Navigation} />
              <PublishersContainer/>
        </div>
    )
}