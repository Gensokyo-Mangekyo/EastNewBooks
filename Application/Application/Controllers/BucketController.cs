using Application.Entities;
using Application.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Controllers
{
    public class BucketController : Controller
    {
        [HttpGet]
        [Route("/GetBucket")]
        public IActionResult GetBucket(int id,[FromServices] ApplicationContext applicationContext)
        {
            var BucketData = new List<BucketModel>();
            var UserBucket = applicationContext.Bucket.Where(x => x.UserId == id).OrderBy(x => x.Id).AsEnumerable();
            foreach (var item in UserBucket)
            {
                var Book = applicationContext.Books.Where(x => x.Id == item.BookId).FirstOrDefault();
                if (Book != null)
                {
                    BucketData.Add(new
                    BucketModel
                        (item.Id,
                        Book.Name,
                        Book.Price,
                        item.Count,
                        Book.Url,
                        Book.Id)
                    );
                }
            }
            return new JsonResult(BucketData);
        }

        [HttpPost]
        [Route("/RemoveBucket")]
        public IActionResult RemoveBucket(int UserId,int BucketId, [FromServices] ApplicationContext applicationContext)
        {
            var Bucket = applicationContext.Bucket.Where(x => x.Id == BucketId).FirstOrDefault();
            if (Bucket != null)
                applicationContext.Bucket.Remove(Bucket);
            applicationContext.SaveChanges();
            return new JsonResult(applicationContext.Bucket.Where(x => x.UserId == UserId).OrderBy(x => x.Id).AsEnumerable());
        }

        [HttpPost]
        [Route("/UpdateBucket")]
        public IActionResult UpdateBucket([FromBody] Bucket bucket, [FromServices] ApplicationContext applicationContext)
        {
            applicationContext.Bucket.Update(bucket);
            applicationContext.SaveChanges();
            return new StatusCodeResult(200);
        }

        [HttpPost]
        [Route("/AddBookBucket")]
        public IActionResult AddBookBucket([FromBody] BookUser bookUser, [FromServices] ApplicationContext applicationContext)
        {
            Bucket bucket = new Bucket();
            bucket.Count = 1;
            bucket.BookId = bookUser.BookId;
            bucket.UserId = bookUser.UserId;
            if (applicationContext.Bucket.Where(x=> x.BookId == bucket.BookId && x.UserId == bucket.UserId).FirstOrDefault() != null)
                return new StatusCodeResult(200);
            applicationContext.Bucket.Add(bucket);
            applicationContext.SaveChanges();
            return new StatusCodeResult(200);
        }

        [HttpPost]
        [Route("/IncreaseCountBucket")]
        public int IncreaseCountBucket(int BucketId, [FromServices] ApplicationContext applicationContext) 
        {
            var Bucket = applicationContext.Bucket.Where(x => x.Id == BucketId).FirstOrDefault();
            if (Bucket != null)
            {
                if (Bucket.Count + 1 <= 10)
                {
                    Bucket.Count += 1;
                    applicationContext.Bucket.Update(Bucket);
                    applicationContext.SaveChanges();
                }
                return Bucket.Count;
            }
            else return 1;
        }

        [HttpPost]
        [Route("/DecreaseCountBucket")]
        public int DecreaseCountBucket(int BucketId, [FromServices] ApplicationContext applicationContext)
        {
            var Bucket = applicationContext.Bucket.Where(x => x.Id == BucketId).FirstOrDefault();
            if (Bucket != null)
            {
                if (Bucket.Count-1 > 0)
                {
                    Bucket.Count -= 1;
                    applicationContext.Bucket.Update(Bucket);
                    applicationContext.SaveChanges();
                }
                return Bucket.Count;
            }
            else return 1;
        }
    }
}
