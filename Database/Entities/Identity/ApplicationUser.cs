using AspNetCore.Identity.MongoDbCore.Models;
using MongoDbGenericRepository.Attributes;

namespace Database.Entities.Identity
{
    [CollectionName("Users")]
    public class ApplicationUser : MongoIdentityUser<string>
    {
    }
}
