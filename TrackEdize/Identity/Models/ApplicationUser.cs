using AspNetCore.Identity.MongoDbCore.Models;
using MongoDbGenericRepository.Attributes;

namespace TrackEdize.Identity.Models
{
    [CollectionName("Users")]
    public class ApplicationUser : MongoIdentityUser<string>
    {
    }
}
