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
    }
}
