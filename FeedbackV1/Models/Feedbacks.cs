using Microsoft.WindowsAzure.Storage.Table;
using System;
using System.Collections.Generic;
using System.Text;

namespace FeedbackV1.Models
{
    public class Feedbacks : TableEntity
    {
        public const string TableName = "Feedbacks";
        public string ID
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
        public string FEED_ID
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

        public Int64 CommSkills { get; set; }
        public string Comments { get; set; }
        public string ID_manager { get; set; }

        public string ID_receiver { get; set; }

        public Boolean Pending { get; set; }

        public Int64 Productivity { get; set; }

        public Int64 Punctuality { get; set; }
        public Int64 WorkQuality { get; set; }


    }
}