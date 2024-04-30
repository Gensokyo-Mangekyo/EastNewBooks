using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Entities
{
    public class Bucket
    {
        public int Id { get; set; }
        public int Count { get; set; }
        public Book book { get; set; }
        public int BookId { get; set; }
        public User user { get; set; }
        public int UserId { get; set; }
    }

}
