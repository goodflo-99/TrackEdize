using Database.Entities;
using Database.Interfaces;
using Database.Repositories;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Services
{
    public class IssueService : BaseCRUDService<Issue>
    {
        private readonly ProjectService _projectService;
        private readonly IssueRepository _issueRepository;
        public IssueService(IssueRepository repository, ProjectService projectService) : base(repository, nameof(Issue))
        {
            _issueRepository = repository;
            _projectService = projectService;
        }

        public override async Task<Issue?> GetAsync(string id)
        {
            ArgumentNullException.ThrowIfNull(id);

            var issue = await base.GetAsync(id);
            ArgumentNullException.ThrowIfNull(issue, $"Issue with id {id} was not found");
            var project = _projectService.GetAsync(issue.Project.Id);
            var project_abbv = await _projectService.GetAbbv(issue.Project.Id);
            issue.Key = $"{project_abbv}-{issue.OrderNumber}";
            return issue;
        }

        public override async Task CreateAsync(Issue newEntity)
        {
            //newEntity.Project.Id = "63a8d2002e1cfeff073bd484";
            newEntity.OrderNumber = await _issueRepository.GetOrderByProjectId(newEntity.Project.Id);
            var project_abbv = await _projectService.GetAbbv(newEntity.Project.Id);
            newEntity.Key = $"{project_abbv}-{newEntity.OrderNumber}";
            newEntity.Status = "Open";

            var project = await _projectService.GetAsync(newEntity.Project.Id);
            newEntity.Project.Name = project.Name;

            await base.CreateAsync(newEntity);
        }

        public async Task<IEnumerable<Issue>> GetByProject(string projectId)
        {
            return await _issueRepository.GetByProjectId(projectId);
        }
    }
}
