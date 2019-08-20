using System.Collections.Generic;
using FeedbackV1.Models;
using FeedbackV1.Repositories;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using Newtonsoft.Json;

namespace FeedbackV1.Data
{
    public class Seed
    {
        private readonly IAuthRepository _repo;
        
        public Seed(IAuthRepository repo)
        {

          _repo = repo;

        }


        public void SeedUsers()
        {
            var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
            var users = JsonConvert.DeserializeObject<List<User>>(userData);
            foreach (var user in users)
            {
            
            var userToCreate = new User
            {
                Dep_Id = user.Dep_Id,
                Id = user.Id,
                Email = user.Email,
                Name = user.Name,
                Manager_ID = user.Manager_ID


                
            };
            var createdUser = _repo.Register(userToCreate, "password");

            }

        }
     

    }
    
}