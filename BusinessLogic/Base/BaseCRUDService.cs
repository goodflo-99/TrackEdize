using Database.Entities.Base;
using Database.Interfaces;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusunessLogic.Services.Base
{
    public class BaseCRUDService<T> where T : BaseEntity
    {
        protected readonly IBaseRepository<T> _repository;

        public BaseCRUDService(IBaseRepository<T> repository, string collectionName)
        {
            _repository = repository;
            _repository.Configure(collectionName);
        }

        public async Task<IEnumerable<T>> GetAsync() => await _repository.GetAsync();

        public async Task<IEnumerable<T>> GetUndeleted() => await _repository.GetUnDeleted();

        public virtual async Task<T?> GetAsync(string id) => await _repository.GetAsync(id);

        public virtual async Task CreateAsync(T newEntity)
        {
            newEntity.CreatedDate = DateTime.UtcNow;
            newEntity.UpdatedDate = DateTime.UtcNow;
            newEntity.IsDeleted = false;
            await _repository.CreateAsync(newEntity);
        }

        public async Task UpdateAsync(T updatedEntity)
        {
            await UpdateAsync(updatedEntity.Id, updatedEntity);
        }

        public async Task UpdateAsync(string id, T updatedEntity)
        {
            ArgumentNullException.ThrowIfNull(id);

            updatedEntity.UpdatedDate = DateTime.UtcNow;
            await _repository.UpdateAsync(id, updatedEntity);
        }

        public async Task RemoveAsync(string id) => await _repository.RemoveAsync(id);
        

        public async Task DeleteAsync(string id) => await _repository.DeleteAsync(id);
    }
}
