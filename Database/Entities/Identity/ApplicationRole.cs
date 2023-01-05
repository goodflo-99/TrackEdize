using AspNetCore.Identity.MongoDbCore.Models;
using MongoDbGenericRepository.Attributes;

namespace Database.Entities.Identity
{
    [CollectionName("Roles")]
    public class ApplicationRole : MongoIdentityRole<string>
    {
    }
}
