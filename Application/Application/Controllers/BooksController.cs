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
        [HttpPost]
        [Route("/AddBook")]
        public JsonResult AddBook([FromBody] Book BodyBook ,[FromServices] ApplicationContext applicationContext, [FromServices] ImageService imageService)
        {
            if (BodyBook != null)
            {
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

        [HttpGet]
        [Route("/GetBooks")]
        public IActionResult GetBooks([FromServices] ApplicationContext applicationContext)
        {
            return new JsonResult(applicationContext.Books.OrderBy(item => item.Id).ToList());
        }


        [HttpGet]
        [Route("/SearchBooks")]
        public IActionResult SearchBooks(string query, [FromServices] ApplicationContext applicationContext)
        {
            List<Book> searchBooks = new List<Book>();

            Array.ForEach(applicationContext.Books.OrderBy(item => item.Id).ToArray(), (x) =>
            {
                if (x.Name.ToLower().Contains(query.ToLower()))
                    searchBooks.Add(x);
            });

            return new JsonResult(searchBooks);
        }

        [HttpGet]
        [Route("/Book")]
        public IActionResult GetBookById(int id, [FromServices] ApplicationContext applicationContext)
        {
            var Book = applicationContext.Books.Where(item => item.Id == id).First();
            var Publisher = applicationContext.Publishers.Where(x => x.Id == Book.PublisherId).FirstOrDefault();
            var Category = applicationContext.Categories.Where(x => x.Id == Book.CategoryId).FirstOrDefault();
            return new JsonResult(new { Book.Id,Book.Name,Book.Pages,Book.Price,Book.Year,Book.Url, Publisher = Publisher.Name, Category = Category.Name, Book.Description });
        }

        [HttpPost]
        [Route("/DeleteBook")]
        public IActionResult DeleteBookById(int id, [FromServices] ApplicationContext applicationContext)
        {
            if (id < 0)
                return BadRequest();

            var Element = applicationContext.Books.Where(x => x.Id == id).FirstOrDefault();

            if (Element != null)
            {
                applicationContext.Books.Remove(Element);
                applicationContext.SaveChanges();
                return Ok();
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

    }
}
