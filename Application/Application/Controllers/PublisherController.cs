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
    }
}
