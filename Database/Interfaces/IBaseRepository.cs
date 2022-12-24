using Database.Entities.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Interfaces
{
    public interface IBaseRepository <T> where T : BaseEntity
    {
        void Configure(string collectionName);

        Task<IEnumerable<T>> GetAsync();

        Task<IEnumerable<T>> GetUnDeleted();

        Task<T?> GetAsync(string id);

        Task CreateAsync(T createdEntity);

        Task UpdateAsync(string id, T updatedEntity);

        Task RemoveAsync(string id);

        Task DeleteAsync(string id);
    }
}
