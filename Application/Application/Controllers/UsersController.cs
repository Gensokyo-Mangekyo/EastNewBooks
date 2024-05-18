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
            if (user.Role.ToLower() == Roles[3]) return new JsonResult(new { Error = "Роль пользователя администратор!" });
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

        [HttpPost]
        [Route("/RemoveUser")]
        public IActionResult RemoveUser(int id, [FromServices] ApplicationContext applicationContext)
        {
            var User = applicationContext.Users.Where(x => x.Id == id).FirstOrDefault();
            if (User != null)
            {
                if (User.Role == "Администратор") return new JsonResult(new { Error = "Роль пользователя администратор!" });
                applicationContext.Users.Remove(User);
                applicationContext.SaveChanges();
                return new JsonResult(new { });
            }
            return new JsonResult(new { Error = "Id пользователя не существует!" });
        }
    }

}
