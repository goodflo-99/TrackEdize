using BusunessLogic.Services.Base;
using Database.Entities;
using Database.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusunessLogic.Services
{
    public class ProjectService : BaseCRUDService<Project>
    {
        public ProjectService(IBaseRepository<Project> repository) : base(repository, nameof(Project))
        {

        }

        public async Task<string?> GetAbbv(string id)
        {
            ArgumentNullException.ThrowIfNull(id, nameof(id));
            var project = await GetAsync(id);
            return project?.Abbreviation;
        } 
    }
}
