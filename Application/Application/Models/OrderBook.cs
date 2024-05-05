using Application.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Models
{
    public class OrderBook
    {
        public int BookId { get; set; }
        public int Count { get; set; }
        public int Price { get; set; }

        public OrderBook()
        {

        }

        public OrderBook(UserBookOrder userBookOrder)
        {
            BookId = userBookOrder.BookId;
            Count = userBookOrder.Count;
            Price = userBookOrder.Price;
        }
    }

}
