import axios from "axios"

export default class BucketService {

    static host = "http://localhost:5000"

    static async GetBucketById(id) {
        try {
            const response = await axios.get(BucketService.host + "/GetBucket?id=" + id)
            return response.data
            } catch(e) {
                console.log(e)
            }
    }

    static async AddBucket(BookUser) {
        try {
            await axios.post(BucketService.host + "/AddBookBucket",BookUser)
            } catch(e) {
                console.log(e)
            }
    }

    static async RemoveBookBucket(BucketId,UserId) {
        try {
           const response = await axios.post(BucketService.host + "/RemoveBucket?BucketId=" + BucketId +"&UserId="+UserId)
           return response.data
            } catch(e) {
                console.log(e)
            }
    }

    static async IncreaseCount(BucketId) {
        try {
            const response = await axios.post(BucketService.host + "/IncreaseCountBucket?BucketId=" + BucketId)
            return response.data
             } catch(e) {
                 console.log(e)
             }
    }

    static async DecreaseCount(BucketId) {
        try {
            const response = await axios.post(BucketService.host + "/DecreaseCountBucket?BucketId=" + BucketId)
            return response.data
             } catch(e) {
                 console.log(e)
             }
    }

}