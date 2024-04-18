using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index(int? statusCode = null)
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "index.html");
            if (!System.IO.File.Exists(filePath))
            {
                return NotFound(); // Возвращаем ошибку 404, если файл не найден
            }
            return PhysicalFile(filePath, "text/html");
        }

        [HttpPost]
        [Route("/RemoveCategory")]
        public IActionResult RemoveCategory(int id, [FromServices] ApplicationContext applicationContext)
        {
            var Category = applicationContext.Categories.Where(x => x.Id == id).FirstOrDefault();
            if (Category != null)
            {
                foreach (var item in applicationContext.Books.Where(x=> x.Category.Id == Category.Id)) //(Cascade Delete On) -  Remove Category from Books else they will delete.
                {
                    item.Category = null;
                    item.CategoryId = null;
                    applicationContext.Books.Update(item);
                }
                applicationContext.Remove(Category);
                applicationContext.SaveChanges();
            }
            return new JsonResult(applicationContext.Categories.ToList());
        }
    }
}
