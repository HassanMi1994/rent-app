using domain.enums;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace domain.entities
{
    public class User : IdentityUser
    {
        [Required]
        public ServiceType ServiceType { get; set; }

        [Required]
        public bool IsDemoAccount { get; set; }

        [Required]
        public bool IsAdmin { get; set; }

        public string? StoreName { get; set; }
    }
}
