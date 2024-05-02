import GlobalService from "../API/GlobalService";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/UI/Header/Header";
import Nav from "../components/UI/Nav/Nav";
import BucketService from "../API/BucketService";
import UsersService from "../API/UsersService";
import OrderContainer from "../components/OrderContainer";


export default function Order() {

    const navigate = useNavigate()
    const [Bucket,SetBucket] = useState()
    const [User,SetUser] = useState()
    const [SumBucket,SetSumBucket] = useState(0)
    const [Error,SetError] = useState("")

    async function GetBucket(login,password) {
        const User = await UsersService.GetUser(login,password)
        if (User === undefined)
            return
        SetUser(User)
        const Bucket = await   BucketService.GetBucketById(User.id)
        SetBucket(Bucket)
        let sum = 0
        Bucket.forEach(element => {
            sum += element.price * element.count
        });
        if (sum === 0){
            navigate('/Bucket')
            return
        }
        SetSumBucket(sum)
    }

  async function ResultCallback(Error) {
        if (!Error) {
            const url = await UsersService.GetUrl(User.login,User.password)
            navigate(url)
            return
        }
        else SetError(Error)
    }

    useEffect(()=> {
       const Data = GlobalService.GetLoginAndPassword()
       if (Data["Login"] && Data["Password"]) 
            GetBucket(Data["Login"],Data["Password"])
       else navigate('/Bucket')
    },[])

    return (<div>
      <Header/>
      <Nav  Navigate = {GlobalService.Navigation}  />
      {Error !== "" ? <h1 className="ErrorOrder" >{Error}</h1> : ""} 
      <OrderContainer Result={ResultCallback} User={User} Sum={SumBucket} Bucket={Bucket} />
    </div>)
}