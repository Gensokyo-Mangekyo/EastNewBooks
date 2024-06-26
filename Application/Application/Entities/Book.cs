﻿using System;

#nullable enable
namespace Application.Entities
{
    public class Book: ICloneable
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public int Year { get; set; }
        public string Name { get; set; }
        public int Pages { get; set; }
        public string Author { get; set; }
        public decimal Price { get; set; }
        public Category? Category { get; set; } 
        public Publisher? Publisher { get; set; } 
        public string? Description { get; set; } = null;
        public int? CategoryId { get; set; } = null;
        public int? PublisherId { get; set; } = null;
        public bool IsStock { get; set; } = true;

    public Book(int id, string url, int year, string name, string author, int pages, decimal price,Category category = null, Publisher publisher = null, string description = null)
        {
            Id = id;
            Url = url;
            Year = year;
            Name = name;
            Author = author;
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
            return $"{Id} { Url} {Year} {Name} {Pages} {Author} {Price} {Category?.Name} {Publisher?.Name} {Description}";
        }

        public object Clone()
        {
            return new Book(Id,Url,Year,Name,Author,Pages,Price,Category,Publisher,Description);
        }
    }
}
