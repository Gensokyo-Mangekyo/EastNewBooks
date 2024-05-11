using Application.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Controllers
{
    public class PublisherController : Controller
    {
        [HttpGet]
        [Route("/GetPublishers")]
        public IActionResult GetPublishers([FromServices] ApplicationContext applicationContext)
        {
            return new JsonResult(applicationContext.Publishers.OrderBy(item => item.Id).AsEnumerable());
        }

        [HttpPost]
        [Route("/UpdatePublishers")]
        public IActionResult UpdatePublishers([FromBody] PublishersArray publishersArray, [FromServices] ApplicationContext applicationContext )
        {
            foreach (var item in publishersArray.Publishers)
            {
                applicationContext.Update(item);
            }
            applicationContext.SaveChanges();
            return StatusCode(200);
        }

        [HttpPost]
        [Route("/RemovePublisher")]
        public IActionResult RemovePublisher(int id, [FromServices] ApplicationContext applicationContext)
        {
            var Publisher = applicationContext.Publishers.Where(x => x.Id == id).FirstOrDefault();
            if (Publisher != null)
            { 
                Array.ForEach(applicationContext.Books.Where(x => x.PublisherId == id).ToArray(), (value) => { //(Cascade Delete On) -  Remove Publisher from Books else they will delete.
                    value.Publisher = null;
                    value.PublisherId = null;
                    applicationContext.Books.Update(value);
                });
                applicationContext.Remove(Publisher);
                applicationContext.SaveChanges();
                return StatusCode(200);
            }
            return StatusCode(404);
        }
    }
}
