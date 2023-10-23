using Goalify.Models;
using Goalify.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Goalify.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUsersRepository _usersRepository;
        public UsersController(IUsersRepository UsersRepository)
        {
            _usersRepository = UsersRepository;
        }

        // https://localhost:5001/api/users/
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_usersRepository.GetAll());
        }
        

        //https://localhost:5001/api/users/email
        [HttpGet("{email}")]
        public IActionResult Get(string email)
        {
            Users user = _usersRepository.Get(email);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }


        // https://localhost:5001/api/users/
        [HttpPost]
        public IActionResult Post(Users user)
        {
            _usersRepository.Add(user);
            return CreatedAtAction("Get", new { id = user.Id }, user);
        }

        // https://localhost:5001/api/user/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Users user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _usersRepository.Update(user);
            return NoContent();
        }

        // https://localhost:5001/api/user/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _usersRepository.Delete(id);
            return NoContent();
        }
    }
}


