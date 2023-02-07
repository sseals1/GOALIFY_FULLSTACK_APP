using Goalify.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Goalify.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipsController : ControllerBase
    {
        private readonly ITipsRepository _tipsRepository;
        public TipsController(ITipsRepository TipsRepository)
        {
            _tipsRepository = TipsRepository;
        }

        // https://localhost:5001/api/tips/
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_tipsRepository.GetAll());
        }

        // https://localhost:5001/api/tips/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var tip = _tipsRepository.Get(id);
            if (tip == null)
            {
                return NotFound();
            }
            return Ok(tip);
        }



    }
}
