using Application.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Application.Controllers
{
    public class BooksController : Controller
    {
        readonly int Limit = 8;

        [HttpPost]
        [Route("/AddBook")]
        public JsonResult AddBook([FromBody] Book BodyBook ,[FromServices] ApplicationContext applicationContext, [FromServices] ImageService imageService)
        {
            if (BodyBook != null)
            {
                if (applicationContext.Books.Where(x=> x.Name == BodyBook.Name).FirstOrDefault() != null) return new JsonResult(new { Error = "Книга с таким названием уже существует!" });
                Book CloneBook = BodyBook.Clone() as Book;
                CloneBook.Url = imageService.GetUrImage("ImagesBooks", CloneBook.Name, CloneBook.Url);
                if (CloneBook.Category != null)
                {
                    var Category = applicationContext.Categories.Where(x => x.Name == CloneBook.Category.Name).FirstOrDefault();
                    if (Category != null)
                        CloneBook.Category = Category;
                    else {
                        applicationContext.Categories.Add(CloneBook.Category);
                        applicationContext.SaveChanges();
                        CloneBook.Category = applicationContext.Categories.OrderBy(x => x.Id).Last();
                    }
                }
                if (CloneBook.Publisher != null)
                {
                    var Publisher = applicationContext.Publishers.Where(x => x.Name == CloneBook.Publisher.Name).FirstOrDefault();
                    if (Publisher != null)
                        CloneBook.Publisher = Publisher;
                    else
                    {
                        applicationContext.Publishers.Add(CloneBook.Publisher);
                        applicationContext.SaveChanges();
                        CloneBook.Publisher = applicationContext.Publishers.OrderBy(x => x.Id).Last();
                    }
                }
                applicationContext.Books.Add(CloneBook);
                applicationContext.SaveChanges();
                return new JsonResult(applicationContext.Books.OrderBy(item => item.Id).Last());
            }
            else
            {
                return new JsonResult(new { Error = "Некоректно введённые данные в поле ввода!" });
            }
        }

        private int GetLastPage(IEnumerable<Book> books)
        {
            float DivPage = (float)books.Count()  / (float)Limit;
            if (DivPage % 1 != 0)
            {
                int roundedNumber = (int)Math.Ceiling(DivPage);
                return roundedNumber;
            }
            if (DivPage == 0)
            {
                DivPage = 1;
            }
            return (int)DivPage;
        }

        [HttpGet]
        [Route("/GetLastPage")]
        public int GetBooks(string filter,[FromServices] ApplicationContext applicationContext)
        {
            if (string.IsNullOrEmpty(filter))
            return GetLastPage(applicationContext.Books);
            else
            {
                var Books = applicationContext.Books.OrderBy(item => item.Id).Where(x => x.Category != null).Where(x => x.Category.Name == filter).AsEnumerable();
                return GetLastPage(Books);
            }
        }

        [HttpGet]
        [Route("/GetBooks")]
        public IActionResult GetBooks(int page, [FromServices] ApplicationContext applicationContext)
        {
            return new JsonResult(applicationContext.Books.OrderBy(item => item.Id).AsEnumerable().Take(page * Limit).TakeLast(Limit).ToList());
        }

        [HttpGet]
        [Route("/CategoryBooks")]
        public IActionResult CategoryBooks(string category, int page, [FromServices] ApplicationContext applicationContext)
        {
            return new JsonResult(applicationContext.Books.OrderBy(item => item.Id).Where(x => x.Category != null).Where(x => x.Category.Name == category).AsEnumerable().Take(page * Limit).TakeLast(Limit).ToList());
        }


        [HttpGet]
        [Route("/SearchBooks")]
        public IActionResult SearchBooks(string query,int page, [FromServices] ApplicationContext applicationContext)
        {
            List<Book> searchBooks = new List<Book>();

            Array.ForEach(applicationContext.Books.OrderBy(item => item.Id).ToArray(), (x) =>
            {
                if (x.Name.ToLower().Contains(query.ToLower()))
                    searchBooks.Add(x);
            });
            int LastPage = GetLastPage(searchBooks);
            int Take = page * Limit;
            var Books = searchBooks.Take(Take).TakeLast(Limit).ToList();
            if (Take > searchBooks.Count())
            {
                Take = Take - searchBooks.Count();
                Books = searchBooks.TakeLast(Take).ToList();
            }
            return new JsonResult(new { 
            Last = LastPage,
            Books = Books
                });
        }


        [HttpGet]
        [Route("/Book")]
        public IActionResult GetBookById(int id, [FromServices] ApplicationContext applicationContext)
        {
            var Book = applicationContext.Books.Where(item => item.Id == id).First();
            var Publisher = applicationContext.Publishers.Where(x => x.Id == Book.PublisherId).FirstOrDefault();
            var Category = applicationContext.Categories.Where(x => x.Id == Book.CategoryId).FirstOrDefault();
            return new JsonResult(new { Book.Id,Book.Name,Book.Pages,Book.Price,Book.Year, Book.Author,Book.Url, Publisher = Publisher?.Name, Category = Category?.Name, Book?.Description });
        }

        [HttpPost]
        [Route("/DeleteBook")]
        public IActionResult DeleteBookById(string id, [FromServices] ApplicationContext applicationContext)
        {
            int Id = 0;
            if (int.TryParse(id, out Id)) //Attepmt convert to int
            {
                if (Id < 0)
                    return BadRequest();
                var Element = applicationContext.Books.Where(x => x.Id == Id).FirstOrDefault();

                if (Element != null)
                {
                    applicationContext.Books.Remove(Element);
                    applicationContext.SaveChanges();
                    return Ok();
                }
            }
            else //This is name book
            {
                var Element = applicationContext.Books.Where(x => x.Name == id).FirstOrDefault();
                if (Element != null)
                {
                    applicationContext.Books.Remove(Element);
                    applicationContext.SaveChanges();
                    return Ok();
                }
            }

            return BadRequest();

        }

        [HttpPost]
        [Route("/UpdateBook")]
        public IActionResult UpdateBook([FromBody] Book book, [FromServices] ApplicationContext applicationContext)
        {
            if (book.Category != null)
            {
                var Category = applicationContext.Categories.Where(x => x.Name == book.Category.Name).FirstOrDefault();
                if (Category == null) {
                    applicationContext.Categories.Add(book.Category);
                    applicationContext.SaveChanges();
                    book.Category = applicationContext.Categories.OrderBy(x => x.Id).Last();
                }
                else book.Category = Category;
            }
            if (book.Publisher != null)
            {
                var Publisher = applicationContext.Publishers.Where(x => x.Name == book.Publisher.Name).FirstOrDefault();
                if (Publisher == null)
                {
                    applicationContext.Publishers.Add(book.Publisher);
                    applicationContext.SaveChanges();
                    book.Publisher = applicationContext.Publishers.OrderBy(x => x.Id).Last();
                }
                else book.Publisher = Publisher;

            }
            applicationContext.Books.Update(book);
            applicationContext.SaveChanges();
            return Ok();
        }

        [HttpGet]
        [Route("/GetCategories")]
        public IActionResult GetCategories([FromServices] ApplicationContext applicationContext)
        {
            return new JsonResult(applicationContext.Categories.ToList());
        }

    }
}
