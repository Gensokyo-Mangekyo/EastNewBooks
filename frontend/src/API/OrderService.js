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

    static async GetAllOrders() {
        try {
            const response = await axios.get(OrderService.host + "/GetAllOrders")
            return response.data
              } catch(e) {
                  console.log(e)
          }
    }

    static async RemoveOrder(id) {
        try {
            await axios.post(OrderService.host + "/RemoveOrder?id="+id)
              } catch(e) {
                  console.log(e)
          }
    }

    static async SetStatusOrder(id,status) {
        try {
          await axios.post(OrderService.host + "/SetStatusOrder?id=" + id + "&" + "status=" + status)
              } catch(e) {
                  console.log(e)
          }
    }

    static async GetOrdersById(id) {
        try {
            const response = await axios.get(OrderService.host + "/GetOrdersById?userId=" + id)
            return response.data
              } catch(e) {
                  console.log(e)
          }
    }
   
}