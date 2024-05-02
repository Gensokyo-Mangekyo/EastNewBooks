using Application.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Models
{
    public class OrderModel
    {
        public int Id { get; set; }
        public string DepartureDate { get; set; }
        public OrderBook[] OrderBooks { get; set; }
        public User User;
        public int UserId { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public int Index { get; set; }
        public string Status { get; set; }

    }



}
