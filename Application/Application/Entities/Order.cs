using Application.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Entities
{
    public class Order
    {
        public int Id { get; set; }
        public string Status { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
        public string DepartureDate { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public int Index { get; set; }

        public Order(OrderModel orderModel)
        {
            Status = orderModel.Status;
            UserId = orderModel.UserId ;
            DepartureDate = orderModel.DepartureDate;
            Address = orderModel.Address;
            City = orderModel.City;
            Index = orderModel.Index;
        }

        public Order()
        {

        }
    }
}
