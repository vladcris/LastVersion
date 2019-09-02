using Microsoft.WindowsAzure.Storage.Table;
using System;
using System.Collections.Generic;
using System.Text;

namespace FeedbackV1.Models
{
    public class Departament : TableEntity
    {
        public const string TableName = "Departments";

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

        public string Name {get; set;}

    }
}
