using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BuisnessLayer.Models;

namespace BuisnessLayer.Controllers
{
    [RoutePrefix("Api/Products")]
    public class ProductsController : ApiController
    {
        CyberShopeeEntities2 entities = new CyberShopeeEntities2();

        //Constructor
        public ProductsController()
        {
            entities.Configuration.ProxyCreationEnabled = false;
        }

        //Accept get request
        [HttpGet]
        [Route("AllProducts")]
        public List<products> getProducts()
        {
            try
            {
                entities.Configuration.LazyLoadingEnabled = false;
                //entities.Configuration.ProxyCreationEnabled = false;
                List<products> newProducts = entities.products.AsNoTracking().ToList();

                return newProducts;
            }
            catch (Exception)
            {
                throw;
            }
        }

        //Getting the Response by id
        [HttpGet]
        [Route("GetCartByUserId/{userId}")]
        public List<shoppingCart> GetCartByUserId(int userId)
        {
            List<shoppingCart> objCart = new List<shoppingCart>();

            objCart = (from obj in entities.shoppingCart
                       where obj.userId == userId
                       select obj).ToList();
            return objCart;
        }

        //Accept get request based on parameter product id
        [HttpGet]
        [Route("GetProductById/{productId}")]
        public IHttpActionResult getProductById(int productId)
        {
            try
            {
                entities.Configuration.LazyLoadingEnabled = false;
                products objProduct = entities.products.Find(productId);
                if (objProduct == null)
                {
                    return NotFound();
                }
                return Ok(objProduct);
            }
            catch (Exception)
            {
                throw;
            }
        }

        //Accept post request
        [HttpPost]
        [Route("AddProduct")]
        public IHttpActionResult addProduct(products newProduct)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    products objProduct = entities.products.Find(newProduct.productId);
                    if (objProduct == null)
                    {
                        entities.products.Add(newProduct);
                        entities.SaveChanges();
                        return Ok(newProduct);
                    }
                    else
                    {
                        return BadRequest("Product id already exist!!");
                    }
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        //Accepts put request
        [HttpPut]
        [Route("UpdateProduct")]
        public IHttpActionResult updateProduct(products newProduct)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    entities.Configuration.LazyLoadingEnabled = false;
                    products objProduct = entities.products.Find(newProduct.productId);
                    if (objProduct == null)
                    {
                        return NotFound();
                    }
                    else
                    {
                        objProduct.categoryId = newProduct.categoryId;
                        objProduct.productName = newProduct.productName;
                        objProduct.price = newProduct.price;
                        objProduct.description = newProduct.description;
                        objProduct.imageUrl = newProduct.imageUrl;
                        entities.SaveChanges();
                        return Ok(newProduct);
                    }
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        //Accepts delete request based on product id parameter
        [HttpDelete]
        [Route("DeleteProduct/{productId}")]
        public string deleteProduct(int productId)
        {
            try
            {
                products objProduct = entities.products.Find(productId);
                if (objProduct == null)
                {
                    return "No such product id found!!";
                }
                else
                {
                    entities.products.Remove(objProduct);
                    entities.SaveChanges();
                    return "Product deleted succesfully!!";
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
