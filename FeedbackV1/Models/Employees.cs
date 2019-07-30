using Microsoft.WindowsAzure.Storage.Table;
using System;
using System.Collections.Generic;
using System.Text;

namespace FeedbackV1.Models
{
    public class Employees : TableEntity
    {
        public const string TableName = "Employees";
        public string DEP_ID
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
        public string ID
        {
            get
            {
                return RowKey;
            }
            set
            {
                RowKey = value;
            }
        }

        public string Name { get; set; }
        public string Email { get; set; }
        public string Manager_ID { get; set; }

    }
}