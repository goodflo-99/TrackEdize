using Database.Entities.Base;
using Database.Interfaces;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Repositories
{
    public class BaseRepository<T> : IBaseRepository<T> where T : BaseEntity
    {
        private readonly IMongoDatabase _database;
        protected IMongoCollection<T> _collection;

        public BaseRepository(IOptions<DatabaseSettings> dbSettings)
        {
            var mongoClient = new MongoClient(
                dbSettings.Value.ConnectionString);

            _database = mongoClient.GetDatabase(
                dbSettings.Value.DatabaseName);

            _collection = _database.GetCollection<T>(dbSettings.Value.BaseCollectionName);
        }

        public void Configure(string collectionName)
        {
            _collection = _database.GetCollection<T>(collectionName);
        }

        public async Task<IEnumerable<T>> GetAsync() =>
            await _collection.Find(_ => true).ToListAsync();

        public async Task<IEnumerable<T>> GetUnDeleted() => await _collection.Find(f => f.IsDeleted == false).ToListAsync();

        public async Task<T?> GetAsync(string id) =>
            await _collection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(T newEntity) =>
            await _collection.InsertOneAsync(newEntity);

        public async Task UpdateAsync(string id, T updatedEntity) =>
            await _collection.ReplaceOneAsync(x => x.Id == id, updatedEntity);

        public async Task RemoveAsync(string id)
        {
            await _collection.DeleteOneAsync(x => x.Id == id);
        }

        public async Task DeleteAsync(string id)
        {
            var del = await GetAsync(id);
            del.IsDeleted = true;
            await UpdateAsync(id, del);
        }
    }
}
