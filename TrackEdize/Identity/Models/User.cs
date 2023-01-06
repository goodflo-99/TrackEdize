using System.ComponentModel.DataAnnotations;

namespace Database.Entities.Identity
{
    public class User
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string RepeatPassword { get; set; }
        [Required]
        [EmailAddress(ErrorMessage = "Invalid Email")]
         public string Email { get; set; }
        [Required]
        public string FirstName {get;set;}
        [Required]
        public string LastName {get;set;}
    }
}
