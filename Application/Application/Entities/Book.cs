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
        public Category Category { get; set; } 
        public Publisher Publisher { get; set; } 
        public string Description { get; set; }
        public int CategoryId { get; set; }
        public int PublisherId { get; set; }

        public Book(int id, string url, string year, string name, int pages, decimal price,Category category = null, Publisher publisher = null, string description = null)
        {
            Id = id;
            Url = url;
            Year = year;
            Name = name;
            Pages = pages;
            Price = price;
            Category = category;
            Publisher = publisher;
            Description = description;
        }

        public Book()
        {

        }

        public override string ToString()
        {
            return $"{Id} { Url} {Year} {Name} {Pages} {Price} {Category?.Name} {Publisher?.Name} {Description}";
        }

        public object Clone()
        {
            return new Book(Id,Url,Year,Name,Pages,Price,Category,Publisher,Description);
        }
    }
}
