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
            var project_abbv = await _projectService.GetAbbv(issue.ProjectId);
            issue.Key = $"{project_abbv}-{issue.OrderNumber}";
            return issue;
        }

        public override async Task CreateAsync(Issue newEntity)
        {
            newEntity.ProjectId = "639e26060350994520d59428";
            newEntity.OrderNumber = await _issueRepository.GetOrderByProjectId(newEntity.ProjectId);
            var project_abbv = await _projectService.GetAbbv(newEntity.ProjectId);
            newEntity.Key = $"{project_abbv}-{newEntity.OrderNumber}";

            await base.CreateAsync(newEntity);
        }
    }
}
