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
    public class DepartamentController: ControllerBase
    {

        private readonly IMapper _mapper;
        
        public DepartamentController(IMapper mapper)
        {
              _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> GetEmployees()
        {
            var repo = new TableStorageRepository();
            var cards = await repo.GetAllDepartments();

            var departmentsToReturn = _mapper.Map<IEnumerable<DepartamentListDto>>(cards);
            if (!cards.Any())
                return NotFound();
            return Ok(departmentsToReturn);
        }

    }
}