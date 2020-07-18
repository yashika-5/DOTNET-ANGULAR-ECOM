using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using BuisnessLayer.Models;

namespace BuisnessLayer.Controllers
{
    public class shoppingCartsController : ApiController
    {
        private CyberShopeeEntities2 db = new CyberShopeeEntities2();

        //Constructor
        public shoppingCartsController()
        {
            db.Configuration.ProxyCreationEnabled = false;
        }

        // GET: api/shoppingCarts
        public IQueryable<shoppingCart> GetshoppingCarts()
        {

            return db.shoppingCart;
        }

        // GET: api/shoppingCarts/5
        [ResponseType(typeof(shoppingCart))]
        public IHttpActionResult GetshoppingCart(int id)
        {
            shoppingCart shoppingCart = db.shoppingCart.Find(id);
            if (shoppingCart == null)
            {
                return NotFound();
            }

            return Ok(shoppingCart);
        }

        // PUT: api/shoppingCarts/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutshoppingCart(int id, shoppingCart shoppingCart)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != shoppingCart.cartNo)
            {
                return BadRequest();
            }

            db.Entry(shoppingCart).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!shoppingCartExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/shoppingCarts
        [ResponseType(typeof(shoppingCart))]
        public IHttpActionResult PostshoppingCart(shoppingCart shoppingCart)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.shoppingCart.Add(shoppingCart);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (shoppingCartExists(shoppingCart.cartNo))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = shoppingCart.cartNo }, shoppingCart);
        }

        // DELETE: api/shoppingCarts/5
        [ResponseType(typeof(shoppingCart))]
        public IHttpActionResult DeleteshoppingCart(int id)
        {
            shoppingCart shoppingCart = db.shoppingCart.Find(id);
            if (shoppingCart == null)  
            {
                return NotFound();
            }

            db.shoppingCart.Remove(shoppingCart);
            db.SaveChanges();

            return Ok(shoppingCart);
        }
        //Dispose: db object
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
        //Check Shopping Cart for a user is empty or not
        private bool shoppingCartExists(int id)
        {
            return db.shoppingCart.Count(e => e.cartNo == id) > 0;
        }



        //Get details of order for a specific user
        [ResponseType(typeof(IQueryable<shoppingCart>))]
        [Route("api/GetOrderDetailUsingUserID/{id}")]
        public IHttpActionResult GetOrderDetailUsingUserID(int id)
        {
            var filterDocDetails = from dd in db.shoppingCart
                                   where dd.userId == id
                                   select dd;
            if (filterDocDetails == null)
            {
                return NotFound();
            }

            return Ok(filterDocDetails);
        }
    }
}