using System.ComponentModel.DataAnnotations;

namespace FeedbackV1.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [StringLength(8,MinimumLength = 6, ErrorMessage = "You must set password between 6-8 characters")]
        public string Password { get; set; }

        public string Dep_Id { get; set; }
        public string Id { get; set; }
        public string Name { get; set; }
        public string Manager_ID { get; set; }

    
    }
}