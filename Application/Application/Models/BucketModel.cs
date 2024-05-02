using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Models
{
    public class BucketModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int Count { get; set; }
        public string Url { get; set; }
        public int BookId { get; set; }

        public BucketModel(int id, string name, decimal price, int count, string url, int bookId)
        {
            Id = id;
            Name = name;
            Price = price;
            Count = count;
            Url = url;
            BookId = bookId;
        }
    }
}
