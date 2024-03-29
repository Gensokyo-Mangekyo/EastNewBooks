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
            return new JsonResult(applicationContext.Books.Where(item => item.Id == id).FirstOrDefault());
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
            applicationContext.Books.Update(book);
            applicationContext.SaveChanges();
            return Ok();

        }

    }
}
