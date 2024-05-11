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

    static async UpdatePublishers(PublishersArrayJson) {
        try {
            await axios.post(PublisherService.host + "/UpdatePublishers",PublishersArrayJson)
            } catch(e) {
                console.log(e)
        }
    }

    static async RemovePublisherById(id) {
        try {
            await axios.post(PublisherService.host + "/RemovePublisher?id=" + id)
            } catch(e) {
                console.log(e)
        }
    }
}