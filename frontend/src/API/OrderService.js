import axios from "axios"

export default class OrderService  {

    static host = "http://localhost:5000"

    static async AddOrder(order) { 
        try {
          const response = await axios.post(OrderService.host + "/AddOrder",order)
          return response.data
            } catch(e) {
                console.log(e)
        }
    }
   
}