import axios from 'axios'


export default class UsersService {

    static host = "http://localhost:5000"

    static async IsExistUser(login,password) {
        try {
           const response = await axios.get(UsersService.host + "/CheckUser?login="+login + "&password="+password)
          return response.data
          } catch(e) {
              console.log(e)
          }
    }

    static async AddNewUser(user) {
        try {
            const response = await axios.post(UsersService.host + "/AddNewUser",user)
            return response.data
           } catch(e) {
               console.log(e)
           }
    }

    static async GetUrl(login,password) {
        try {
            const response = await axios.get(UsersService.host + "/GetUser?login="+login + "&password="+password)
            const Url = {
                "Пользователь": "/UserCabinet",
                "Продавец": "/SellerCabinet",
                "Менеджер": "/ManagerCabinet",
                "Администратор": "/AdminCabinet",
            }
            return Url[response.data["role"]]

           } catch(e) {
               console.log(e)
           }
    }

    static async GetUser(login,password) {
        try {
            const response = await axios.get(UsersService.host + "/GetUser?login="+login + "&password="+password)
            return response.data
           } catch(e) {
            console.log(e)
           }
    }

    static async GetRole(login,password,Role) {
        try {
            const response = await axios.get(UsersService.host + "/GetUser?login="+login + "&password="+password)
            return response.data["role"]
           } catch(e) {
              return ""
           }
    }

    static async RemoveUser(id) {
        try {
            const response = await axios.post(UsersService.host + "/RemoveUser?id="+id)
            return response.data
           } catch(e) {
              return ""
           }
    }

}