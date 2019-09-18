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
    public class ReceiverController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IMapper _mapper;

        public ReceiverController(IAuthRepository repo, IMapper mapper)
        {

            _repo = repo;
            _mapper = mapper;

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetFeedbacksByReceiver([FromQuery]UserParams userParams, string id)
        {
            var repo = new TableStorageRepository();
            var feedbacks = await repo.GetFeedbacksByReceiver(userParams, id);


            var feedbacksToReturn = _mapper.Map<IEnumerable<FeedbackListDto>>(feedbacks);
            //// pentru nume
            var users = await repo.GetUsersWithoutParams(); 
            foreach (var feedback in feedbacksToReturn)
            {
                foreach (var user in users)
                {
                    
                if (user.Id == feedback.ID)
                {
                    feedback.Sender = user.Name;
                }

                if (user.Id == feedback.ID_receiver)
                {
                    feedback.Receiver = user.Name;
                }

                if (user.Id == feedback.ID_manager)
                {
                    feedback.Manager = user.Name;
                }

                }
            }
            /// end pentru nume

            Response.AddPagination(feedbacks.CurrentPage, feedbacks.PageSize, feedbacks.TotalCount, feedbacks.TotalPages);

            if (feedbacksToReturn == null)
                return NotFound();
            return Ok(feedbacksToReturn);

        }


    }
}