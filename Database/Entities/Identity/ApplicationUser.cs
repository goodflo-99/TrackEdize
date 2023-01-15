using AspNetCore.Identity.MongoDbCore.Models;
using Common.Entities.Identity;
using MongoDB.Bson.Serialization.Attributes;
using MongoDbGenericRepository.Attributes;

namespace Database.Entities.Identity
{
    [CollectionName("Users")]
    public class ApplicationUser : MongoIdentityUser<string>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string? Role { get; set; }

        public string? Country { get; set; }
        public string? City { get; set; }

        public string? Gender { get; set; } = "male";

        [BsonIgnore]
        public string FullName => $"{FirstName} {LastName}";

        public ApplicationUser() : base()
        {
        }

        public ApplicationUser(User user) : base()
        {
            UserName = user.UserName;
            Email = user.Email;
            FirstName = user.FirstName;
            LastName = user.LastName;
        }
    }
}
