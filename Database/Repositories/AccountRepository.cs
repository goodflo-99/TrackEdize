using Database.Entities.Identity;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Database.Repositories;

public class AccountRepository
{
    private readonly IMongoDatabase _database;
    protected IMongoCollection<ApplicationUser> _users;

    public AccountRepository(IOptions<DatabaseSettings> dbSettings)
    {
        var mongoClient = new MongoClient(
            dbSettings.Value.ConnectionString);

        _database = mongoClient.GetDatabase(
            dbSettings.Value.DatabaseName);

        _users = _database.GetCollection<ApplicationUser>(dbSettings.Value.UserCollectionName);
    }

    public async Task<IEnumerable<ApplicationUser>> GetUsersAsync() {
        return (await _users.FindAsync(x => true)).ToEnumerable();
    }

    public async Task<ApplicationUser> GetUserAsync(string userName) {
        var res = await _users.FindAsync(x=> x.UserName.ToUpperInvariant() == userName.ToUpperInvariant());
        return res.FirstOrDefault();
    }
}