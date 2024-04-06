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
    }
}
