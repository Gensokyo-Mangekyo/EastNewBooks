using Application.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Models
{

    public class StockModel
    {
        public int Id { get; set; }
        public int Count { get; set; }
        public Book Book { get; set; }
        public int BookId { get; set; }
        public IEnumerable<Sale> Sales { get; set; }

        public StockModel(Stock stock, Book book)
        {
            Id = stock.Id;
            Count = stock.Count;
            Book = book;
            BookId = book.Id;
        }
    }
}
