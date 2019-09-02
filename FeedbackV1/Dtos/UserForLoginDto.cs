using System.ComponentModel.DataAnnotations;

namespace FeedbackV1.Dtos
{
    public class UserForLoginDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [StringLength(8,MinimumLength = 4, ErrorMessage = "You must set password between 4-8 characters")]
        public string Password { get; set; }
    }
}