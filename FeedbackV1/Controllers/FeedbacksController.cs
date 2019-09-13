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
    public class FeedbacksController : ControllerBase
    {
        private readonly IMapper _mapper;
        
        public FeedbacksController(IMapper mapper)
        {
              _mapper = mapper;
        }
        
        [HttpGet]
        public async Task<IActionResult> GetFeedbacks()
        {
            var repo = new TableStorageRepository();
            var feedbacks = await repo.GetAllFeedbacks();
            var feedbacksToReturn = _mapper.Map<IEnumerable<FeedbackListDto>>(feedbacks);
            if (!feedbacksToReturn.Any())
                return null;
            return Ok(feedbacksToReturn);
        }

        [Route("{id}")]
        [HttpGet]
        public async Task<IActionResult> GetFeedbackById(string id)
        {
            var repo = new TableStorageRepository();
            var names = await repo.GetNamesForFeedback(id);
            var feedbackToReturn = _mapper.Map<FeedbackListDto>(names);
            if (feedbackToReturn == null)
                 return NotFound();
            return Ok(feedbackToReturn);
        }



        [Route("{id}/{feed}")]
        [HttpGet]
        public async Task<IActionResult> GetFeedbackByFeed(string id, string feed)
        {
            var repo = new TableStorageRepository();
            var feedback = await repo.GetFeedByFeedAndUserId(id, feed);
            var feedbackToReturn = _mapper.Map<FeedbackListDto>(feedback);
            if (feedbackToReturn == null)
                return NotFound();
            return Ok(feedbackToReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRequest(string id, RequestSendDto  updateRequest)
        {   
            var repo = new TableStorageRepository();
            var feedback = await repo.GetFeedByFeedId(id); // iau toata entitatea care a fost creata la request
            _mapper.Map(updateRequest, feedback);  // mapez ce trimit din angular in aceasta entitate, restul ramane la fel
            await repo.PostEntityFeedback(feedback); //
            return Ok();
        }


        [HttpPost()]
        public async Task<IActionResult> GiveFeedback(GiveFeedbackDto giveFeedbackDto)
        {
        
            var repo = new TableStorageRepository();
            var userToCreate = _mapper.Map<Feedbacks>(giveFeedbackDto);
            var createdUser = await repo.GiveFeedback(userToCreate);
            return Ok(createdUser);
            
        }


        [HttpPost("{id}")]
        public async Task<IActionResult> RequestFeedback(RequestFeedbackDto requestFeedbackDto, string id)
        {
            var repo = new TableStorageRepository();
            var requestToCreate = _mapper.Map<Feedbacks>(requestFeedbackDto);
            var createdRequest = await repo.RequestFeedback(requestToCreate, id);
            return Ok(createdRequest);

        }

    }
}