import axios from 'axios'



export default class BooksService {

    //static host = "https://localhost:44344"
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
      return response.data
      } catch(e) {
          console.log(e)
      }
  }

  static async GetBookById(id) {
    try {
      const response = await axios.get(BooksService.host + "/Book?id=" + id)
      return response.data
      } catch(e) {
          console.log(e)
      }
  }

  static async DeleteBookById(id) {
    try {
      await axios.post(BooksService.host + "/DeleteBook?id=" + id)
      return 200  
      } catch(e) {
          return 400
      }
  }

  static async UpdateBook(Book) {
    try {
      const response = await axios.post(BooksService.host + "/UpdateBook",Book)
      return response.status
      } catch(e) {
          return 400
      }
  }

}