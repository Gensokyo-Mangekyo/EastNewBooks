using Application.Models;
using Microsoft.AspNetCore.Mvc;
using Application.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Application.Controllers
{
    public class OrderController : Controller
    {
        public IActionResult GetOrders()
        {
            return View();
        }


        private JsonResult GetOrders(IEnumerable<Order> order, ApplicationContext applicationContext)
        {
            var OrderModels = new List<object>();
            foreach (var item in order)
            {
                var User = applicationContext.Users.Where(x => x.Id == item.UserId).FirstOrDefault();
                if (User != null)
                {
                    var OrderModel = new OrderModel();
                    var ListOrderBook = new List<object>();
                    foreach (var UserBookOrder in applicationContext.UserBookOrder.Where(x => x.OrderId == item.Id))
                    {
                        var Book = applicationContext.Books.Where(x => x.Id == UserBookOrder.BookId).FirstOrDefault();
                        if (Book != null)
                            ListOrderBook.Add(new { Count = UserBookOrder.Count, Book = Book, Price = UserBookOrder.Price });

                    }
                    OrderModel.User = User;
                    //Field User not add in Json Object because creating anonim class object!!!
                    OrderModels.Add(new
                    {
                        Id = item.Id,
                        User = new { Name = User.Name, Surname = User.Surname, Phone = User.Phone, Email = User.Email },
                        OrderBooks = ListOrderBook,
                        Address = item.Address,
                        City = item.City,
                        DepartureDate = item.DepartureDate,
                        Status = item.Status,
                        Index = item.Index
                    }); ;
                }
            }
            return new JsonResult(OrderModels);
        }

        [HttpGet]
        [Route("/GetAllOrders")]
        public IActionResult GetAllOrders([FromServices] ApplicationContext applicationContext)
        {
            var Orders = applicationContext.Order;
            return GetOrders(Orders,applicationContext);
        }

        [HttpPost]
        [Route("/RemoveOrder")]
        public IActionResult RemoveOrder(int id,[FromServices] ApplicationContext applicationContext)
        {
            var Order = applicationContext.Order.Where(x => x.Id == id).FirstOrDefault();
            if (Order != null)
            {
                applicationContext.Order.Remove(Order);
                applicationContext.SaveChanges();
            }
            return StatusCode(200);
        }

        [HttpPost]
        [Route("/SetStatusOrder")]
        public IActionResult SetStatusOrder(int id, string status,[FromServices] ApplicationContext applicationContext)
        {
            var Order = applicationContext.Order.Where(x => x.Id == id).FirstOrDefault();
            if (Order != null)
            {
                Order.Status = status;
                applicationContext.Order.Update(Order);
                applicationContext.SaveChanges();
                return StatusCode(200);
            }
            return StatusCode(400);
        }

        [HttpGet]
        [Route("/GetOrdersById")]
        public IActionResult GetOrdersById(int userId, [FromServices] ApplicationContext applicationContext)
        {
            var Orders = applicationContext.Order.Where(x=> x.UserId == userId);
            return GetOrders(Orders, applicationContext);
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
