using Application.Models;
using Microsoft.AspNetCore.Mvc;
using Application.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Controllers
{
    public class OrderController : Controller
    {
        public IActionResult GetOrders()
        {
            return View();
        }

        [HttpPost]
        [Route("/AddOrder")]
        public int AddOrder([FromBody] OrderModel OrderModel, [FromServices] ApplicationContext applicationContext)
        {
            var Order = new Order(OrderModel);
            applicationContext.Order.Add(Order);
            applicationContext.SaveChanges();
            int OrderId = applicationContext.Order.OrderBy(x => x.Id).Last().Id;
            foreach (var item in OrderModel.OrderBooks)
            {
                var UserBookOrder = new UserBookOrder(item.BookId, OrderId, item.Count);
                applicationContext.UserBookOrder.Add(UserBookOrder);
                var BucketBook = applicationContext.Bucket.Where(x => x.BookId == item.BookId && x.UserId == Order.UserId).FirstOrDefault();
                if (BucketBook != null)
                    applicationContext.Bucket.Remove(BucketBook);
            }
            applicationContext.SaveChanges();
            return 200;
        }
    }
}
