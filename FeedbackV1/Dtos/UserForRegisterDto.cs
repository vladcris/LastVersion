using System.ComponentModel.DataAnnotations;

namespace FeedbackV1.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [StringLength(8,MinimumLength = 4, ErrorMessage = "You must set password between 4-8 characters")]
        public string Password { get; set; }
        
        [Required]
        public string Dep_Id { get; set; }
        
        public string Id { get; set; }
        public string Role { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Manager_ID { get; set; }

    }
    
    
}