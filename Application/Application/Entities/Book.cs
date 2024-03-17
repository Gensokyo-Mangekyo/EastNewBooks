using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Entities
{
    public class Book: ICloneable
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string Year { get; set; }
        public string Name { get; set; }
        public int Pages { get; set; }
        public decimal Price { get; set; }

        public Book(int id, string url, string year, string name, int pages, decimal price)
        {
            Id = id;
            Url = url;
            Year = year;
            Name = name;
            Pages = pages;
            Price = price;
        }

        public object Clone()
        {
            return new Book(Id,Url,Year,Name,Pages,Price);
        }
    }
}
