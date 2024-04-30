import axios from 'axios'

export default class PublisherService {
    
    static host = "http://localhost:5000"

    static async GetPublishers() {
        try {
            const response = await axios.get(PublisherService.host + "/GetPublishers")
            return response.data
            } catch(e) {
                console.log(e)
        }
    }
}