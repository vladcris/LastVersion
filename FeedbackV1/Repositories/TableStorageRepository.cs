using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using System.Linq;

using System.Net.Http;
using System.Net;
using FeedbackV1.Models;
using System.Security.Claims;

namespace FeedbackV1.Repositories
{
    public class TableStorageRepository : IAuthRepository
    {
        private CloudTable cardsTable, feedbacksTable, userTable, departamentTable;
        private CloudTableClient tableClient;
        const string StorageAccountName = "employeesfeedbackapp";
        const string StorageAccountKey = "tTQ64T+PDy/lIqusmfzmvkMh/nMQKPDVd7w8pzJ8fpKgMTQal75PtIdjQU+0gg3cpDNasv5DwQygDJjN3wS5eg==";
        public TableStorageRepository()
        {
            CloudStorageAccount storageAccount = new CloudStorageAccount(new Microsoft.WindowsAzure.Storage.Auth.StorageCredentials(StorageAccountName, StorageAccountKey), true);
            tableClient = storageAccount.CreateCloudTableClient();
            cardsTable = tableClient.GetTableReference("Employees");
            feedbacksTable = tableClient.GetTableReference("Feedbacks");
            userTable = tableClient.GetTableReference("User");
            departamentTable = tableClient.GetTableReference("Departments");
            // Create the CloudTable if it does not exist
        }
        public async Task PostEntityFeedback(ITableEntity obj)
        {
            TableOperation insertOperation = TableOperation.Replace(obj);
            try
            {
                var result = await feedbacksTable.ExecuteAsync(insertOperation);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public async Task PostEntityUser(ITableEntity obj)
        {
            TableOperation insertOperation = TableOperation.InsertOrReplace(obj);
            try
            {
                var result = await userTable.ExecuteAsync(insertOperation);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }

        public async Task<List<Employees>> GetAllEntities()
        {
            await cardsTable.CreateIfNotExistsAsync();
            var results = (await cardsTable.ExecuteQuerySegmentedAsync(new TableQuery<Employees>(), null)).ToList<Employees>();
            List<Employees> people = results;
            people = people.OrderBy(x => x.Name).ToList();
            if (people == null)
                return null;
            return people;
        }

         public async Task<List<Departament>> GetAllDepartments()
        {
            await cardsTable.CreateIfNotExistsAsync();
            var results = (await departamentTable.ExecuteQuerySegmentedAsync(new TableQuery<Departament>(), null)).ToList<Departament>();
            List<Departament> people = results;
            people = people.OrderBy(x => x.Name).ToList();
            if (people == null)
                return null;
            return people;
        }

        
        public async Task<List<Employees>> GetAllEntities2(string value)
        {   
           
            await cardsTable.CreateIfNotExistsAsync();
            // string filter1 = TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, value);
            string filter2 = TableQuery.GenerateFilterCondition("RowKey", QueryComparisons.Equal, value);
            // string combinedFilter = TableQuery.CombineFilters(filter1, TableOperators.And, filter2);
            TableQuery<Employees> query = new TableQuery<Employees>().Where(filter2);
            var result = await cardsTable.ExecuteQuerySegmentedAsync(query,null);
             if (result == null)
                return null;
            var results = result.Results;
            return results;
        }
        public async Task<List<Employees>> GetEntityById(string id)
        {
            await cardsTable.CreateIfNotExistsAsync();
            var filter = TableQuery.GenerateFilterCondition("RowKey", QueryComparisons.Equal, id);
            TableQuery<Employees> query = new TableQuery<Employees>().Where(filter);
            var result = await cardsTable.ExecuteQuerySegmentedAsync(query, null);
            if (result == null)
                return null;
            var results = result.Results;
            return results;
        }

         public async Task<List<Feedbacks>> GetAllEntities1()
        {
            await feedbacksTable.CreateIfNotExistsAsync();
            // string filter2 = TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, ID);
            // TableQuery<Feedbacks> query = new TableQuery<Feedbacks>().Where(filter2);
            // var result = await feedbacksTable.ExecuteQuerySegmentedAsync(query,null);
            var results = (await feedbacksTable.ExecuteQuerySegmentedAsync(new TableQuery<Feedbacks>(), null)).ToList<Feedbacks>();
            List<Feedbacks> feedbacks = results;
            feedbacks = feedbacks.OrderByDescending(x => x.Pending).ToList();
             if (feedbacks == null)
                return null;
            return feedbacks;
            // var results = (await feedbacksTable.ExecuteQuerySegmentedAsync(new TableQuery<Feedbacks>(), null)).ToList<Feedbacks>();
            // if (results == null)
            //     return null;
            // return results;
        }

        public async Task<Feedbacks> GetFeedById(string id)
        {
            await feedbacksTable.CreateIfNotExistsAsync();
            var filter = TableQuery.GenerateFilterCondition("RowKey", QueryComparisons.Equal, id);
            TableQuery<Feedbacks> query = new TableQuery<Feedbacks>().Where(filter);
            var result = await feedbacksTable.ExecuteQuerySegmentedAsync(query, null);
            if (result == null)
                return null;
            // var results = result.Results;
            return result.FirstOrDefault();
        }


        public async Task<Feedbacks> GetFeedByFeed(string id, string feed)
        {
            await feedbacksTable.CreateIfNotExistsAsync();
            var filter1 = TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, id);
            var filter2 = TableQuery.GenerateFilterCondition("RowKey", QueryComparisons.Equal, feed);
            var combinedFilter = TableQuery.CombineFilters(filter1, TableOperators.And, filter2);
            TableQuery<Feedbacks> query = new TableQuery<Feedbacks>().Where(combinedFilter);
            var result = await feedbacksTable.ExecuteQuerySegmentedAsync(query, null);
            if (result == null)
                return null;
            return result.FirstOrDefault();
        }
        
        public async Task<Feedbacks> GiveFeedback(Feedbacks feedback)
        {   
            feedback.RowKey = Guid.NewGuid().ToString();
            await feedbacksTable.CreateIfNotExistsAsync();
            TableOperation insertOperation = TableOperation.InsertOrReplace(feedback);
           var result = await feedbacksTable.ExecuteAsync(insertOperation);
            return(feedback);

        }



     
     
       //////User////
        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHAsh(password, out passwordHash, out passwordSalt);

            user.PartitionKey = user.Dep_Id;
            user.RowKey = Guid.NewGuid().ToString();
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            await userTable.CreateIfNotExistsAsync();
            //TableOperation insertOperation = TableOperation.Insert(user);
           // await userTable.ExecuteAsync(insertOperation);
            TableOperation insertOperation = TableOperation.InsertOrReplace(user);
             var result = await userTable.ExecuteAsync(insertOperation);
            return (user);

        }

        private void CreatePasswordHAsh(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
            
        }

        public async Task<User> Login(string email, string password)
        {
        
            await userTable.CreateIfNotExistsAsync();
            var filter = TableQuery.GenerateFilterCondition("Email", QueryComparisons.Equal, email);
            TableQuery<User> query = new TableQuery<User>().Where(filter);
            var result = await userTable.ExecuteQuerySegmentedAsync(query, null);
            var user =  result.FirstOrDefault();

             if (user == null)
                return null;
            
            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
            return null;

            return user;
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if(computedHash[i] != passwordHash[i]) return false;
                }
            }
            return true;
        }

        public async Task<bool> UserExists(string email)
        {   
            await userTable.CreateIfNotExistsAsync();
            var filter = TableQuery.GenerateFilterCondition("Email", QueryComparisons.Equal, email);
            TableQuery<User> query = new TableQuery<User>().Where(filter);
            var result = await userTable.ExecuteQuerySegmentedAsync(query, null);
            var user =  result.FirstOrDefault();

            if(user == null)
            return false;

            return true;
        }


        /////user apisss
        public void Add<T>(T entity) where T : class
        {
            var repo = new TableStorageRepository();
            repo.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            var repo = new TableStorageRepository();
            repo.Delete(entity);
        }

        public async Task<bool> SaveAll()
        {
            var repo = new TableStorageRepository();
            return await repo.SaveAll();
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            await userTable.CreateIfNotExistsAsync();
            var results = (await userTable.ExecuteQuerySegmentedAsync(new TableQuery<User>(), null)).ToList<User>();
             List<User> people = results;
             people = people.OrderBy(x => x.PartitionKey).ToList();
            if (people == null)
                return null;
            return people;
        }

        public async Task<User> GetUser(string id)
        {   

            await userTable.CreateIfNotExistsAsync();
            var filter = TableQuery.GenerateFilterCondition("RowKey", QueryComparisons.Equal, id);
            TableQuery<User> query = new TableQuery<User>().Where(filter);
            var result = await userTable.ExecuteQuerySegmentedAsync(query, null);
            if (result == null)
                return null;
            return result.FirstOrDefault();
        }

         public async Task DeleteUser(ITableEntity obj)
        {
            TableOperation insertOperation = TableOperation.Delete(obj);
            try
            {
                var result = await userTable.ExecuteAsync(insertOperation);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }






        /*  public void DeleteEmployee(Employees entity)
          {

              TableOperation deleteOperation = TableOperation.Delete(entity);
              TableResult result = cardsTable.Execute(deleteOperation);

      */
    }
}