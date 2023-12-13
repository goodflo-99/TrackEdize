using Database.Repositories;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Database;

public class SprintRepository : BaseRepository<Sprint>
{
    public SprintRepository(IOptions<DatabaseSettings> dbSettings) : base(dbSettings)
    {
    }

    public async Task<IEnumerable<Sprint>> GetByProjectId(string id)
    {
        var res = await _collection.FindAsync(x => x.ProjectId == id);
        return await res.ToListAsync();
    }

    public async Task<IEnumerable<Sprint>> GetSprintsByDateRange(DateTime startDate, DateTime endDate)
    {
        var filter = Builders<Sprint>.Filter.Gte(s => s.StartDate, startDate) & Builders<Sprint>.Filter.Lte(s => s.EndDate, endDate);
        var sprints = await _collection.FindAsync(filter);
        return await sprints.ToListAsync();
    }

}
