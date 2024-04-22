using Application.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Controllers
{
    public class UsersController : Controller
    {
        [Route("/CheckUser")]
        public int CheckUser(string login,string password,[FromServices] ApplicationContext applicationContext)
        {
            if (applicationContext.Users.Where(x => x.Login == login && x.Password == password).FirstOrDefault() != null)
            {
                return 200;
            }
            else return 404;
        }

        [HttpPost]
        [Route("/AddNewUser")]
        public IActionResult AddNewUser([FromBody]User user, [FromServices] ApplicationContext applicationContext)
        {
            if (applicationContext.Users.Where(x=> x.Login == user.Login).Any()) return new JsonResult(new { Error = "Такой логин уже существует!" });
            string[] Roles = new string[4] { "пользователь", "продавец", "менеджер","администратор" };
            if (!Roles.Any(x=> x == user.Role.ToLower())) return new JsonResult(new { Error = "Такой роли не существует!" });
            if(user.Password.Length < 5) return new JsonResult(new { Error = "Минимальная длинна пароля 5 символов!" });
            applicationContext.Users.Add(user);
            applicationContext.SaveChanges();
            return new JsonResult( new { });
        }

        [HttpGet]
        [Route("/GetUser")]
        public IActionResult GetUser(string login,string password, [FromServices] ApplicationContext applicationContext)
        {
            return new JsonResult(applicationContext.Users.Where(x => x.Login == login && x.Password == password).FirstOrDefault());
        }
    }

}
