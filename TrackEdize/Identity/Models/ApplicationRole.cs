using AspNetCore.Identity.MongoDbCore.Models;
using MongoDbGenericRepository.Attributes;

namespace TrackEdize.Identity.Models
{
    [CollectionName("Roles")]
    public class ApplicationRole : MongoIdentityRole<string>
    {
    }
}
