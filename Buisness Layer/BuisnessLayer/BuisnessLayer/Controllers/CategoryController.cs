using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BuisnessLayer.Models;

namespace BuisnessLayer.Controllers
{
    public class CategoryController : ApiController
    {
        // GET: Category
        CyberShopeeEntities2 entities = new CyberShopeeEntities2();

        // accept get request
        public List<categories> getCategories()
        {
            try
            {
                List<categories> newCategory = entities.categories.ToList();
                entities.Configuration.LazyLoadingEnabled = false;
                return newCategory;
            }
            catch (Exception)
            {
                throw;
            }
        }

        //Accept post request
        public IHttpActionResult postCategory(categories data)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                else
                {
                    categories objCategory = entities.categories.Find(data.categoryId);
                    if (objCategory == null)
                    {
                        entities.categories.Add(data);
                        entities.SaveChanges();
                        return Ok(data);
                    }
                    else
                    {
                        return BadRequest("Category id already exist!!");
                    }
                }
                
                
            }
            catch (Exception)
            {
                throw;
            }
           
        }

        //Accepts put request
        public IHttpActionResult putCategory(categories data)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    categories objCategory = entities.categories.Find(data.categoryId);
                    if (objCategory != null)
                    {
                        objCategory.categoryId = data.categoryId;
                        objCategory.categoryName = data.categoryName;
                        entities.SaveChanges();
                    }

                    return Ok(data);
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

        //Accepts delete request
        public IHttpActionResult deleteCategory(int id)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    categories deleteObjId = entities.categories.Find(id);
                    if (deleteObjId == null)
                    {
                        return NotFound();
                    }
                    entities.categories.Remove(deleteObjId);
                    entities.SaveChanges();
                    return Ok(deleteObjId);
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
    }
}
