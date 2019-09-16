using System;

namespace FeedbackV1.Dtos
{
    public class FeedbackListDto
    {   
        public string ID { get; set; }
        public string FEED_ID { get; set; }
        public string ID_manager { get; set; }
        public string ID_receiver { get; set; }
        public Int64 Productivity { get; set; }
        public Int64 CommSkills { get; set; }
        public Int64 Punctuality { get; set; }
        public Int64 WorkQuality { get; set; }
         public string Comments { get; set; }
        public Boolean Pending { get; set; }
        public DateTime Timestamp {get; set;}

        public string Sender { get; set; }
        public string Receiver { get; set; }
        public string Manager { get; set; }
    }
}