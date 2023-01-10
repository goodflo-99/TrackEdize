using AspNetCore.Identity.MongoDbCore.Models;
using MongoDB.Bson.Serialization.Attributes;
using MongoDbGenericRepository.Attributes;

namespace Database.Entities.Identity
{
    [CollectionName("Users")]
    public class ApplicationUser : MongoIdentityUser<string>
    {
        public string FirstName {get;set;}
        public string LastName {get;set;}

        [BsonIgnore]
        public string FullName => $"{FirstName} {LastName}";
    }
}
