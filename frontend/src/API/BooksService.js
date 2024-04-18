import axios from 'axios'


export default class BooksService {

    static host = "http://localhost:5000"

  static async GetBooks(Page,Filter) {
    try {
      let response = null
      if (Filter)
      response = await axios.get(BooksService.host + "/CategoryBooks?page="+Page + "&category="+Filter)
      else
    response = await axios.get(BooksService.host + "/GetBooks?page="+Page)
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

  static async LastPage(filter) {
    try {
      let response = null
      if (filter)
      response = await axios.get(BooksService.host + "/GetLastPage?filter="+filter) 
    else
      response = await axios.get(BooksService.host + "/GetLastPage") 
    return response.data
    } catch(e) {
      console.log(e)
  }
}

static async GetCategories(SetCategories,Navigate,SetState) {
  try {
    const response = await axios.get(BooksService.host + "/GetCategories") 
    const Categories = []
    if (response) {
    response.data.map(x=> Categories.push( {Id: x.id,Click: ()=> {
      Navigate("/" + x.name)
      if (SetState) SetState(x.name)
    },Name: x.name }))
    SetCategories(Categories)
    }
    else  SetCategories([])
    } catch(e) {
      console.log(e)
  }
}

static async RemoveCategory(id) {
  try {
      const response = await axios.post(BooksService.host + "/RemoveCategory?id= " + id)
      return response.data
      } catch(e) {
          console.log(e)
  }
}

static async GetBooksByCategory(Page,Category) {
  try {
  const response = await axios.get(BooksService.host + "/CategoryBooks?page="+Page + "&category="+Category)
  return response.data
  } catch(e) {
      console.log(e)
  }
}

}