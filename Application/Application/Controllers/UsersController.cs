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
    }
}
