using System;

namespace FeedbackV1.Dtos
{
    public class RequestFeedbackDto
    {
        public string ID_manager { get; set; }
        public string ID_receiver { get; set; }
        public Boolean Pending { get; set; }
    }
}