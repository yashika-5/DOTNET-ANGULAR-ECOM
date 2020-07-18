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
    public class customersController : ApiController
    {
        private CyberShopeeEntities2 db = new CyberShopeeEntities2();

        //Constructor
        public customersController()
        {
            db.Configuration.ProxyCreationEnabled = false;
        }

        // GET: api/customers
        public IQueryable<customers> Getcustomers()
        {
            return db.customers;
        }

        // GET: api/customers/5
        [ResponseType(typeof(customers))]
        public IHttpActionResult Getcustomer(int id)
        {
            customers customer = db.customers.Find(id);
            if (customer == null)
            {
                return NotFound();
            }

            return Ok(customer);
        }

        // PUT: api/customers/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putcustomer(int id, customers customer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != customer.userId)
            {
                return BadRequest();
            }

            db.Entry(customer).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!customerExists(id))
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

        // POST: api/customers
        [ResponseType(typeof(customers))]
        public IHttpActionResult Postcustomer(customers customer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.customers.Add(customer);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (customerExists(customer.userId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = customer.userId }, customer);
        }

        // DELETE: api/customers/5
        [ResponseType(typeof(customers))]
        public IHttpActionResult Deletecustomer(int id)
        {
            customers customer = db.customers.Find(id);
            if (customer == null)
            {
                return NotFound();
            }

            db.customers.Remove(customer);
            db.SaveChanges();

            return Ok(customer);
        }

        //Getting the Response by Id
        [ResponseType(typeof(IQueryable<customers>))]
        [Route("api/GetCustomerDetailByCustId/{id}")]
        public IHttpActionResult GetCustomerDetailByCustId(int id)
        {
            var filterDocDetails = from dd in db.customers
                                   where dd.userId == id
                                   select dd;
            if (filterDocDetails == null)
            {
                return NotFound();
            }

            return Ok(filterDocDetails);
        }

        //Dispose the db Object
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        //Check whether the customer Exists or not
        private bool customerExists(int id)
        {
            return db.customers.Count(e => e.userId == id) > 0;
        }
    }
}