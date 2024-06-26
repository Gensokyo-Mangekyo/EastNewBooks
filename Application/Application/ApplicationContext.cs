﻿using Application.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application
{
    public class ApplicationContext: DbContext
    {
        public DbSet<Book> Books { get; set; } = null!;
        public DbSet<Category> Categories { get; set; } = null!;
        public DbSet<Publisher> Publishers { get; set; } = null!;
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Bucket> Bucket { get; set; } = null!;
        public DbSet<Order> Order { get; set; } = null!;
        public DbSet<UserBookOrder> UserBookOrder { get; set; } = null!;
        public DbSet<Stock> Stock { get; set; } = null!;
        public DbSet<Sale> Sale { get; set; } = null!;
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

    }
}
