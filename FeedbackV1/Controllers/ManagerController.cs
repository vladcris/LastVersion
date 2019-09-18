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
        public async Task<IActionResult> GetDescendants(string managerid)
        {
            var repo = new TableStorageRepository();
            var users = await repo.GetUsers();
            
            Dictionary<string, List<Models.User>> descendantsFromManager = new Dictionary<string, List<Models.User>>();
            Models.User manager = new Models.User();
            manager.Id = managerid;
            manager.Name = managerid;
            foreach (var user in users)
            {
                if (!descendantsFromManager.ContainsKey(user.Manager_ID))
                    descendantsFromManager[user.Manager_ID] = new List<Models.User>();
                descendantsFromManager[user.Manager_ID].Add(user);

                if (user.Name == managerid || user.Id == managerid)
                    manager = user;
               
                
            }
            Queue<Models.User> queue = new Queue<Models.User>();
            List<Models.User> descendants = new List<Models.User>();
            
            queue.Enqueue(manager);
            while(queue.Count!=0)
            {
                var user = queue.Dequeue();
                if (user.Name != managerid && user.Id != managerid)
                    descendants.Add(user);
                if(descendantsFromManager.ContainsKey(user.Name))
                {
                    foreach(var child in descendantsFromManager[user.Name])
                    {
                        queue.Enqueue(child);
                       
                    }
                    descendantsFromManager.Remove(user.Name);
                }
            }
            var usersToReturn = _mapper.Map<IEnumerable<UserDto>>(descendants);
            if (!usersToReturn.Any())
                return NotFound();
            return Ok(usersToReturn);
        }


    }
}
