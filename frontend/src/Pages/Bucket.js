import Header from "../components/UI/Header/Header";
import Nav from "../components/UI/Nav/Nav";
import GlobalService from "../API/GlobalService";
import BucketContainer from "../components/BucketContainer";


export default function Bucket() {
    return(
        <div>
            <Header/>
            <Nav Navigate = {GlobalService.Navigation} />
            <BucketContainer/>
        </div>
    )
}