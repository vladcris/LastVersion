using System;
using Microsoft.WindowsAzure.Storage.Table;
namespace FeedbackV1.Models
{
    public class User : TableEntity
    {
         public const string TableName = "User";
        public string Dep_Id
        {
            get
            {
                return PartitionKey;
            }
            set
            {
                PartitionKey = value;
            }
        }

        public string Id {
         get
        {
            return RowKey;
        } 
        set
        {
            RowKey = value;
            
        } 
        }

        // public User(string Id, string Dep_Id)
        // {
        //     this.PartitionKey = Dep_Id;
        //     this.RowKey = Id;
        // }

        // public string Dep_Id {get; set;}
        // public string Id {get; set;}
        public string Name { get; set; }
        public string Email { get; set; }
        public string Manager_ID { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
    }
}