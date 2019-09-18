using AutoMapper;
using FeedbackV1.Dtos;
using FeedbackV1.Models;
using FeedbackV1.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace FeedbackV1.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class MyFeedbacksController : ControllerBase
    {
        private readonly IMapper _mapper;

        public MyFeedbacksController(IMapper mapper)
        {
            _mapper = mapper;
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> RequestFeedback(RequestFeedbackDto requestFeedbackDto, string id)
        {
            //validate
            var repo = new TableStorageRepository();

            var requestToCreate = _mapper.Map<Feedbacks>(requestFeedbackDto);

            var createdRequest = await repo.RequestFeedback(requestToCreate, id);

            return Ok(createdRequest);

        }
    }
}
