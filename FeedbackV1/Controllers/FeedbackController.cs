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
            // var ID = (User.FindFirst(ClaimTypes.NameIdentifier).Value);
            // var cards = await repo.GetAllEntities1(ID);
            var cards = await repo.GetAllEntities1();
            var feedbacksToReturn = _mapper.Map<IEnumerable<FeedbackListDto>>(cards);
            if (!feedbacksToReturn.Any())
                return null;
            return Ok(feedbacksToReturn);
        }

        // [AllowAnonymous]
        [Route("{id}")]
        [HttpGet]
        public async Task<IActionResult> GetFeedbackById(string id)
        {
            var repo = new TableStorageRepository();
            var cards = await repo.GetFeedById(id);
            var feedbackToReturn = _mapper.Map<FeedbackListDto>(cards);
            // if (!cards.Any())
            //     return NotFound();
            return Ok(feedbackToReturn);
        }



        [Route("{id}/{feed}")]
        [HttpGet]
        public async Task<IActionResult> GetFeedbackByFeed(string id, string feed)
        {
            var repo = new TableStorageRepository();
            var cards = await repo.GetFeedByFeed(id, feed);
            var feedbackToReturn = _mapper.Map<FeedbackListDto>(cards);
            // if (!cards.Any())
            //     return NotFound();
            return Ok(feedbackToReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRequest(string id, RequestSendDto  updateRequest)
        {   
            //TableStorageRepository test = new TableStorageRepository();
            var repo = new TableStorageRepository();
            var cards = await repo.GetFeedById(id);
            _mapper.Map(updateRequest, cards);
            await repo.PostEntityFeedback(cards);
            
            return Ok();
        }


        [HttpPost()]
        public async Task<IActionResult> GiveFeedback(GiveFeedbackDto giveFeedbackDto)
        {
            //validate
            var repo = new TableStorageRepository();

            var userToCreate = _mapper.Map<Feedbacks>(giveFeedbackDto);

            var createdUser = await repo.GiveFeedback(userToCreate);

            return Ok(createdUser);
            
        }

        
        // [Route("{id}")]
        // [HttpGet]
        // public async Task<List<Employees>> GetEmployeesById(string id)
        // {
        //     var repo = new TableStorageRepository();
        //     var cards = await repo.GetEntityById(id);
        //     if (!cards.Any())
        //         return null;
        //     return cards;
        // }
        // [HttpPost]
        // public async Task<Employees> PostAccessCards(Employees card)
        // {
        //     TableStorageRepository test = new TableStorageRepository();
        //     Employees access = new Employees();
        //     access.DEP_ID = "3";
        //     access.ID = "0011";
        //     access.Name = "Viorica Vio";
        //     access.Email = "viovio@yahoo.com";
        //     access.Manager_ID = "0008_1";
        //     //access.Timestamp = DateTime.Now;
        //     test.PostEntity(access);
        //     return access;
        // }
        // [Route("{id}")]
        // [HttpPut]
        // public async Task<Employees> UpdateEmployees(Employees card, string id)
        // {
        //     return new Employees();
        // }
        // [Route("{id}")]
        // [HttpDelete]
        // public async Task<Employees> DeleteEmployees(Employees entity)
        // {
        //     return new Employees();
        // }
    }
}