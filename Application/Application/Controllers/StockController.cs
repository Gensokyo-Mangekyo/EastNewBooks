using Application.Entities;
using Application.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Controllers
{
    public class StockController : Controller
    {
        [HttpGet]
        [Route("/GetStocks")]
        public IActionResult GetStocks([FromServices] ApplicationContext applicationContext)
        {
            var StockList = new List<StockModel>();
            Array.ForEach(applicationContext.Stock.ToArray(), (value) =>
             {
                 var Book = applicationContext.Books.Where(x => x.Id == value.BookId).FirstOrDefault();
                 if (Book != null)
                 {
                     var StockModel = new StockModel(value, Book);
                     Sale[] Sales = applicationContext.Sale.Where(x => x.StockId == value.Id).ToArray();
                     Array.ForEach(Sales, (value) =>
                      {
                          value.User = applicationContext.Users.Where(x => x.Id == value.UserId).FirstOrDefault();
                      });
                     StockModel.Sales = Sales;
                     StockList.Add(StockModel);
                 }
             });
            return new JsonResult(StockList);
        }

        [HttpPost]
        [Route("/RemoveSale")]
        public IActionResult RemoveSale(int id,[FromServices] ApplicationContext applicationContext)
        {
            var Sell = applicationContext.Sale.Where(x => x.Id == id).FirstOrDefault();
            if (Sell != null)
            {
                applicationContext.Sale.Remove(Sell);
                applicationContext.SaveChanges();
                return StatusCode(200);
            }
            return StatusCode(500);
        }

    }
}
