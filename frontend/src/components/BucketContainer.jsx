import { useState,useEffect } from "react"
import "../styles/Bucket.css"
import GlobalService from "../API/GlobalService"
import BucketService from "../API/BucketService"
import UsersService from "../API/UsersService"

export default function BucketContainer() {

    const [BucketBooks,SetBucketBooks] = useState(
        []
    )
    const [EmptyBucket,SetEmptyBucket] = useState(false)
    const [UserId,SetUserId] = useState(0)

    async function GetBucketData(login,password) {
        const User = await UsersService.GetUser(login,password)
        if (User) {
            SetUserId(User.id)
         const Response = await BucketService.GetBucketById(User.id)
         SetBucketBooks(Response)
         if (Response) {
         if (Response.length === 0) {
            SetEmptyBucket(true)
          }
        }
        else SetEmptyBucket(true)
    }
    else SetEmptyBucket(true)
     }

    useEffect(()=> {
        const Data = GlobalService.GetLoginAndPassword()
        if (Data["Login"] || Data["Password"]) {
            GetBucketData(Data["Login"],Data["Password"]) 
            }
            else SetEmptyBucket(true)
        },[])



    const decreaseCount = async (id) => {
        const Count =  await BucketService.DecreaseCount(id)
        SetBucketBooks(prevState => {
            const updatedBooks = prevState.map(bucket => {
                if (bucket.id === id) {
                    return { ...bucket, count: Count };
                }
                return bucket;
            });
            return updatedBooks;
        });
    };

    const increaseCount = async (id) => {
       const Count = await  BucketService.IncreaseCount(id)
        SetBucketBooks(prevState => {
            const updatedBooks = prevState.map(bucket => {
                if (bucket.id === id) {
                    return { ...bucket, count: Count  };
                }
                return bucket;
            });
            return updatedBooks;
        });
    };

    const Remove = async (BucketId) => {
        const NewBucketBooks = await BucketService.RemoveBookBucket(BucketId,UserId)
        SetBucketBooks(prevState => NewBucketBooks);
    }

    return(<div className="BucketMain" >
        <h1>Корзина</h1>
           {EmptyBucket === false ? 
             BucketBooks.map(x=> (
                <div id={x.id} className="BucketItem" >
                <div className="FlexBucketContainer" >
                    <div className="BookContainer" >
                    <img className="BookImg" src={BucketService.host + "/" + x.url} />
                    </div>
                <div className="InfoContainer"  >
                    <p className="BucketHeader">
                    {x.name}
                    </p>
                    <p className="PriceBook">
                    {x.price}₽
                    </p>
                    <div className="CountContainer" >
                        <div onClick={()=> {
                               decreaseCount(x.id)
                        }}  className="Block">
                            -
                        </div>
                        <div className="Count">
                            {x.count}
                        </div>
                        <div className="Block" onClick={()=> {
                            increaseCount(x.id)
                        }} >
                            +
                        </div>
                    </div>
                    <div onClick={()=> {Remove(x.id)}} className="RemoveButton" >Убрать</div>
                    </div>
                </div>
                </div>
            ))
           : <div className="BucketItem"> <div className="Empty" >Корзина Пуста</div> </div> }
    </div>)
}