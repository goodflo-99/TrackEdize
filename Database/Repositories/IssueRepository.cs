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
            var res = await _collection.FindAsync(x => x.ProjectId == id);
            return await res.ToListAsync();
        }


        public async Task<int> GetOrderByProjectId(string id)
        {
            var res = await _collection.Aggregate().Match(x => x.ProjectId == id).Group(i => i.ProjectId, g => new { Max = g.Max(e => e.OrderNumber) }).FirstOrDefaultAsync();
            return res?.Max + 1 ?? 1;
        }
    }
}
