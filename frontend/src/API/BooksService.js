import axios from 'axios'



export default class BooksService {

    //static host = "https://localhost:44344"
    static host = "http://localhost:5000"

  static async GetBooks(Page) {
    try {
    const response = await axios.get(BooksService.host + "/GetBooks?page="+Page)
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

  static async SearchBooks(query,page) {
    if (page === undefined) page = 1
    try {
      const response = await axios.get(BooksService.host + "/SearchBooks?query=" + query + "&page="+page)
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

  static async LastPage() {
    try {
    const response = await axios.get(BooksService.host + "/GetLastPage") 
    return response.data
    } catch(e) {
      console.log(e)
  }
}

}