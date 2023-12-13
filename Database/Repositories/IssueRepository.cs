using Common;
using Database.Entities;
using Database.Interfaces;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Repositories
{
    public class IssueRepository : BaseRepository<Issue>
    {
        public IssueRepository(IOptions<DatabaseSettings> dbSettings) : base(dbSettings)
        {
        }

        public async Task<IEnumerable<Issue>> GetByProjectId(string id)
        {
            var res = await _collection.FindAsync(x => x.Project.Id == id);
            return await res.ToListAsync();
        }


        public async Task<int> GetOrderByProjectId(string id)
        {
            var res = await _collection.Aggregate().Match(x => x.Project.Id == id).Group(i => i.Project.Id, g => new { Max = g.Max(e => e.OrderNumber) }).FirstOrDefaultAsync();
            return res?.Max + 1 ?? 1;
        }

        public async Task<IEnumerable<Issue>> GetBySprint(string id)
        {
            var res = await _collection.FindAsync(x => x.SprintId == id);
            return await res.ToListAsync();
        }

        public async Task<IEnumerable<Issue>> FilterIssues(Filter filter)
    {
        var filterDefinitionBuilder = Builders<Issue>.Filter;
        var filterDefinition = filterDefinitionBuilder.Empty; // Start with an empty filter

        // Apply filters one by one
        if (!string.IsNullOrWhiteSpace(filter.ProjectId))
        {
            filterDefinition &= filterDefinitionBuilder.Eq(x => x.Project.Id, filter.ProjectId);
        }

        if (!string.IsNullOrWhiteSpace(filter.SprintId))
        {
            filterDefinition &= filterDefinitionBuilder.Eq(x => x.SprintId, filter.SprintId);
        }

        if (!string.IsNullOrWhiteSpace(filter.SearchString))
        {
            // You can use the $regex operator for partial string matching
            filterDefinition &= filterDefinitionBuilder.Regex(x => x.Subject, new BsonRegularExpression(filter.SearchString, "i")) // "i" for case-insensitive
                | filterDefinitionBuilder.Regex(x => x.Steps, new BsonRegularExpression(filter.SearchString, "i"));
        }

        // Use the filter definition to query the database
        var filteredIssues = await _collection.Find(filterDefinition).ToListAsync();

        return filteredIssues;
    }

    }
}
