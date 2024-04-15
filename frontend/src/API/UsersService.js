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

}