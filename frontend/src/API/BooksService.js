import axios from 'axios'



export default class BooksService {

    static host = "http://localhost:5000"

  static async GetBooks() {
    try {
    const response = await axios.get(BooksService.host + "/GetBooks")
    return response.data
    } catch(e) {
        console.log(e)
    }
  }

  static async AddBook(Data) {
    try {
        const response = await axios.post(BooksService.host + "/AddBook",Data)
        return response.data
        } catch(e) {
            console.log(e)
    }
  }

  static async SearchBooks(query) {
    try {
      const response = await axios.get(BooksService.host + "/SearchBooks?query=" + query)
      console.log(response.data)
      return response.data
      } catch(e) {
          console.log(e)
      }
  }

}