using System;

namespace FeedbackV1.Dtos
{
    public class GiveFeedbackDto
    {   
        public string ID { get; set; }
        public string FEED_ID { get; set; }
        public string ID_receiver { get; set; }
        public Int64 Productivity { get; set; }
        public Int64 CommSkills { get; set; }
        public Int64 Punctuality { get; set; }
        public Int64 WorkQuality { get; set; }
         public string Comments { get; set; }
         public DateTime timestamp {get; set;}

         public GiveFeedbackDto()
             {
                timestamp = DateTime.Now;
             }
         
    }
}