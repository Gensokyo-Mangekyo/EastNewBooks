using Application.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Controllers
{
    public class BooksController : Controller
    {

        [HttpPost]
        [Route("/AddBook")]
        public IActionResult AddBook([FromBody] Book BodyBook ,[FromServices] ApplicationContext applicationContext, [FromServices] ImageService imageService)
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

    }
}
