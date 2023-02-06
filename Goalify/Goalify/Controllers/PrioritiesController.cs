using Goalify.Models;
using Goalify.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Goalify.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PrioritiesController : ControllerBase
    {
        private readonly IPrioritiesRepository _prioritiesRepository;
        public PrioritiesController(IPrioritiesRepository prioritiesRepository)
        {
            _prioritiesRepository = prioritiesRepository;
        }

        // https://localhost:5001/api/priorities/
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_prioritiesRepository.GetAll());
        }

        // https://localhost:5001/api/priorities/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var priority = _prioritiesRepository.Get(id);
            if (priority == null)
            {
                return NotFound();
            }
            return Ok(priority);
        }

        // https://localhost:5001/api/priorities/
        [HttpPost]
        public IActionResult Post(Priorities priorities)
        {
            _prioritiesRepository.Add(priorities);
            return CreatedAtAction("Get", new { id = priorities.Id }, priorities);
        }

        // https://localhost:5001/api/priorities/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Priorities priorities)
        {
            if (id != priorities.Id)
            {
                return BadRequest();
            }

            _prioritiesRepository.Update(priorities);
            return NoContent();
        }

        // https://localhost:5001/api/priorities/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _prioritiesRepository.Delete(id);
            return NoContent();
        }
    }
}

