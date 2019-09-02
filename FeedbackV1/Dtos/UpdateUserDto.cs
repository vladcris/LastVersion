using System;

namespace FeedbackV1.Dtos
{
    public class UpdateUserDto
    {
        public string DEP_ID {get; set;}
        public string Name { get; set; }
        public string Email { get; set; }
        public DateTime Timestamp{get; set;}
        public string Manager_ID { get; set; }

    }
}