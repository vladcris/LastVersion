using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FeedbackV1.Dtos;
using FeedbackV1.Helpers;
using FeedbackV1.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FeedbackV1.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class RequestController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IMapper _mapper;

        public RequestController(IAuthRepository repo, IMapper mapper)
        {

            _repo = repo;
            _mapper = mapper;

        }

        //[HttpGet()]
        //public async Task<IActionResult> GetAllUsers()
        //{
        //    var repo = new TableStorageRepository();
        //    var users = await repo.GetAllUsers();
        //    var userToReturn = _mapper.Map<IEnumerable<UserDto>>(users);
        //    if (userToReturn == null)
        //        return NotFound();
        //    return Ok(userToReturn);

        //}

        [HttpGet("{id}", Name = "GetByDepartments")]
        public async Task<IActionResult> GetUser(string id)
        {
            var repo = new TableStorageRepository();
            var users = await repo.GetUsersByDepartment(id);
            var userToReturn = _mapper.Map<IEnumerable<UserDto>>(users);
            if (userToReturn == null)
                return NotFound();
            return Ok(userToReturn);

        }


    }
}