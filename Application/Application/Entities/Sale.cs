using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Entities
{
    public class Sale
    {
        public int Id { get; set; }
        public decimal Price { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
        public Stock Stock { get; set; }
        public int StockId { get; set; }
        public string Date { get; set; }

        public Sale()
        {

        }

        public Sale(User user,Stock stock, decimal price)
        {
            User = user;
            UserId = user.Id;
            Stock = stock;
            StockId = stock.Id;
            Price = price;
            Date = DateTime.Now.ToString("d");
        }
    }

}
