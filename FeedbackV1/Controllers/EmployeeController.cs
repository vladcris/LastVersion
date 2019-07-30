using FeedbackV1.Models;
using FeedbackV1.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FeedbackV1.Controllers
{
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        [HttpGet]
        public async Task<List<Employees>> GetEmployees()
        {
            var repo = new TableStorageRepository();
            var cards = await repo.GetAllEntities();
            if (!cards.Any())
                return null;
            return cards;
        }

        
        [Route("{id}")]
        [HttpGet]
        public async Task<List<Employees>> GetEmployeesById(string id)
        {
            var repo = new TableStorageRepository();
            var cards = await repo.GetEntityById(id);
            if (!cards.Any())
                return null;
            return cards;
        }
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
