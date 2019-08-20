using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FeedbackV1.Dtos;
using FeedbackV1.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FeedbackV1.Controllers
{     
    [Authorize] 
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IMapper _mapper;
        
        public UserController(IAuthRepository repo, IMapper mapper)
        {

            _repo = repo;
            _mapper = mapper;

        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var repo = new TableStorageRepository();
            var users = await repo.GetUsers();
            var usersToReturn = _mapper.Map<IEnumerable<UserDto>>(users); 
            if (!usersToReturn.Any())
                return NotFound();
            return Ok(usersToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(string id)
        {
            var repo = new TableStorageRepository();
            var user = await repo.GetUser(id);
            var userToReturn = _mapper.Map<UserDto>(user); 
            if (userToReturn == null)
                return NotFound();
            return Ok(userToReturn);

        }
    }


}