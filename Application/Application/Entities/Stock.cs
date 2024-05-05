using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Entities
{
    public class Stock
    {
        public int Id { get; set; }
        public int Count { get; set; }
        public Book Book { get; set; }
        public int BookId { get; set; }

        public Stock()
        {

        }

        public Stock(Book book)
        {
            Count = 1;
            Book = book;
            BookId = book.Id;
        }

    }

}
