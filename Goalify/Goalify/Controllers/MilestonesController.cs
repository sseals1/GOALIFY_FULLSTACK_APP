using Goalify.Models;
using Goalify.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Goalify.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MilestonesController : ControllerBase
    {
        private readonly IMilestonesRepository _milestonesRepository;
        public MilestonesController(IMilestonesRepository milestonesRepository)
        {
            _milestonesRepository = milestonesRepository;
        }

        // https://localhost:5001/api/milestones/
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_milestonesRepository.GetAll());
        }

        // https://localhost:5001/api/milestones/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var milestone = _milestonesRepository.Get(id);
            if (milestone == null)
            {
                return NotFound();
            }
            return Ok(milestone);
        }

        // https://localhost:5001/api/milestones/
        [HttpPost]
        public IActionResult Post(Milestones milestone)
        {
            _milestonesRepository.Add(milestone);
            return CreatedAtAction("Get", new { id = milestone.Id }, milestone);
        }

        // https://localhost:5001/api/milestones/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Milestones milestone)
        {
            if (id != milestone.Id)
            {
                return BadRequest();
            }

            _milestonesRepository.Update(milestone);
            return NoContent();
        }

        // https://localhost:5001/api/milestones/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _milestonesRepository.Delete(id);
            return NoContent();
        }
    }
}
}
