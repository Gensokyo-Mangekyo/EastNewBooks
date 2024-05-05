using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Entities
{
    public class UserBookOrder
    {
        public int Id { get; set; }
        public Book book { get; set; }
        public int BookId { get; set; }
        public Order Order { get; set; }
        public int OrderId { get; set; }
        public int Count { get; set; }
        public int Price { get; set; }

        public UserBookOrder(int bookId, int orderId, int count,int price)
        {
            BookId = bookId;
            OrderId = orderId;
            Count = count;
            Price = price;
        }

        public UserBookOrder()
        {

        }
    }
}
