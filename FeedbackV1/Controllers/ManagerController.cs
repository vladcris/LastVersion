using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FeedbackV1.Dtos;
using FeedbackV1.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FeedbackV1.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ManagerController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IMapper _mapper;

        public ManagerController(IAuthRepository repo, IMapper mapper)
        {

            _repo = repo;
            _mapper = mapper;

        }
        [Route("{managerid}")]
        //[HttpGet("{managerid}", Name = "GetDescendants")]
        [HttpGet]
        public async Task<IActionResult> GetDescendants(string managerid, [FromQuery]UserParams userParams)
        {
            var repo = new TableStorageRepository();

            var descendants = await repo.GetMyTeamAsManager(managerid);

            if(!string.IsNullOrEmpty(userParams.UserId)) {
                descendants = descendants.Where(x => x.RowKey != userParams.UserId).OrderBy(x => x.Name);
            }

            var usersToReturn = _mapper.Map<IEnumerable<UserDto>>(descendants);
            if (!usersToReturn.Any())
                return NotFound();
            return Ok(usersToReturn);
        }


    }
}
