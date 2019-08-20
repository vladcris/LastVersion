using System;

namespace FeedbackV1.Dtos
{
    public class RequestSendDto
    {
        public Int64 CommSkills {get; set;}
        public Int64 Punctuality {get; set;}
        public Int64 Productivity {get; set;}
        public Int64 WorkQuality {get; set;}
        public string Comments {get; set;}
        public Boolean Pending {get; set;}
    }
}