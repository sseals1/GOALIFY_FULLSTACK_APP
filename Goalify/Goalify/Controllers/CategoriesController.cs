using Goalify.Models;
using Goalify.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Goalify.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoriesRepository _categoriesRepository;
        public CategoriesController(ICategoriesRepository categoriesRepository)
        {
            _categoriesRepository = categoriesRepository;
        }

        // https://localhost:5001/api/categories/
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_categoriesRepository.GetAll());
        }

        // https://localhost:5001/api/categories/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var variety = _categoriesRepository.Get(id);
            if (variety == null)
            {
                return NotFound();
            }
            return Ok(variety);
        }

        // https://localhost:5001/api/categories/
        [HttpPost]
        public IActionResult Post(Categories categories)
        {
            _categoriesRepository.Add(categories);
            return CreatedAtAction("Get", new { id = categories.Id }, categories);
        }

        // https://localhost:5001/api/categories/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Categories categories)
        {
            if (id != categories.Id)
            {
                return BadRequest();
            }

            _categoriesRepository.Update(categories);
            return NoContent();
        }

        // https://localhost:5001/api/categories/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _categoriesRepository.Delete(id);
            return NoContent();
        }
    }
}
