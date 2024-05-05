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


        [HttpGet]
        [Route("/GetAllOrders")]
        public IActionResult GetAllOrders([FromServices] ApplicationContext applicationContext)
        {
            var OrderModels = new  List<object>();
            var Orders = applicationContext.Order.ToList();
            foreach (var item in Orders)
            {
                var User = applicationContext.Users.Where(x => x.Id == item.UserId).FirstOrDefault();
                if (User != null)
                {
                    var OrderModel = new OrderModel();
                    var ListOrderBook = new List<object>();
                      foreach (var UserBookOrder in applicationContext.UserBookOrder.Where(x=> x.OrderId == item.Id))
                        {
                        var Book = applicationContext.Books.Where(x => x.Id == UserBookOrder.BookId).FirstOrDefault();
                            if (Book != null)
                            ListOrderBook.Add(new { Count = UserBookOrder.Count, Book = Book, Price = UserBookOrder.Price });
                        
                        }
                    OrderModel.User = User;
                    //Field User not add in Json Object because creating anonim class object!!!
                    OrderModels.Add(new { Id = OrderModel.Id, User = new { Name = User.Name, Surname = User.Surname, Phone = User.Phone, Email = User.Email }, OrderBooks = ListOrderBook, Address = item.Address, City = item.City, DepartureDate = item.DepartureDate, 
                        Status = item.Status, Index = item.Index } );;
                }
            }
            return new JsonResult(OrderModels);
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
                var UserBookOrder = new UserBookOrder(item.BookId, OrderId, item.Count, item.Price);
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
