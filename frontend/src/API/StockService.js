import axios from 'axios'

export default class StockService {
    
    static host = "http://localhost:5000"

    static async GetStocks() {
        try {
            const response = await axios.get(StockService.host + "/GetStocks")
            return response.data
            } catch(e) {
                console.log(e)
        }
    }

    static async RemoveSellById(id) {
        try {
         await axios.post(StockService.host + "/RemoveSale?id=" + id)
            } catch(e) {
                console.log(e)
        }
    }

    static async ChangeStock(id,count) {
        try {
            const response = await axios.post(StockService.host + "/ChangeStock?id=" + id + "&count="+count)
            return response.data
               } catch(e) {
                   console.log(e)
           }
    }
}