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
            Book CloneBook = BodyBook.Clone() as Book;
            CloneBook.Url = imageService.GetUrImage("ImagesBooks", CloneBook.Name, CloneBook.Url);
            applicationContext.Books.Add(CloneBook);
            applicationContext.SaveChanges();
            return new JsonResult(applicationContext.Books.OrderBy(item => item.Id).Last());
        }

        [HttpGet]
        [Route("/GetBooks")]
        public IActionResult GetBooks([FromServices] ApplicationContext applicationContext)
        {
            return new JsonResult(applicationContext.Books.OrderBy(item => item.Id).ToList());
        }
    }
}
