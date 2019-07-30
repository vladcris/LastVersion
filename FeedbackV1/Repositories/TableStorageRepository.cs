using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using System.Linq;

using FeedbackV1.Models;
using System.Net.Http;
using System.Net;

namespace FeedbackV1.Repositories
{
    public class TableStorageRepository
    {
        private CloudTable cardsTable;
        private CloudTableClient tableClient;
        const string StorageAccountName = "employeesfeedbackapp";
        const string StorageAccountKey = "tTQ64T+PDy/lIqusmfzmvkMh/nMQKPDVd7w8pzJ8fpKgMTQal75PtIdjQU+0gg3cpDNasv5DwQygDJjN3wS5eg==";
        public TableStorageRepository()
        {
            CloudStorageAccount storageAccount = new CloudStorageAccount(new Microsoft.WindowsAzure.Storage.Auth.StorageCredentials(StorageAccountName, StorageAccountKey), true);
            tableClient = storageAccount.CreateCloudTableClient();
            cardsTable = tableClient.GetTableReference("Employees");
            // Create the CloudTable if it does not exist
        }
        public async Task PostEntity(ITableEntity obj)
        {
            TableOperation insertOperation = TableOperation.Insert(obj);
            try
            {
                var result = await cardsTable.ExecuteAsync(insertOperation);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }
        public async Task<List<Employees>> GetEntityById(string id)
        {
            await cardsTable.CreateIfNotExistsAsync();
            var filter = TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, id);
            TableQuery<Employees> query = new TableQuery<Employees>().Where(filter);
            var result = await cardsTable.ExecuteQuerySegmentedAsync(query, null);
            if (result == null)
                return null;
            var results = result.Results;
            return results;
        }
        public async Task<List<Employees>> GetAllEntities()
        {
            await cardsTable.CreateIfNotExistsAsync();
            var results = (await cardsTable.ExecuteQuerySegmentedAsync(new TableQuery<Employees>(), null)).ToList<Employees>();
            if (results == null)
                return null;
            return results;
        }
        /*  public void DeleteEmployee(Employees entity)
          {

              TableOperation deleteOperation = TableOperation.Delete(entity);
              TableResult result = cardsTable.Execute(deleteOperation);

      */
    }
}