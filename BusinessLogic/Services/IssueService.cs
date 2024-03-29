﻿using Database.Entities;
using Database.Interfaces;
using Database.Repositories;
using BusinessLogic.Services.Base;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common;

namespace BusinessLogic.Services
{
    public class IssueService : BaseCRUDService<Issue>
    {
        private readonly ProjectService _projectService;
        private readonly IssueRepository _issueRepository;
        private readonly AccountService _accountService;
        public IssueService(IssueRepository repository, ProjectService projectService, AccountService accountService) : base(repository, nameof(Issue))
        {
            _issueRepository = repository;
            _projectService = projectService;
            _accountService = accountService;
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
            var userInfo = await _accountService.GetAccountInfo();
            newEntity.CreatedBy = userInfo.FullName;

            var project = await _projectService.GetAsync(newEntity.Project.Id);
            newEntity.Project.Name = project.Name;

            await base.CreateAsync(newEntity);
        }

        public async Task<IEnumerable<Issue>> GetByProject(string projectId)
        {
            return await _issueRepository.GetByProjectId(projectId);
        }

        public async Task<List<Comment>> AddCommentAsync(Comment comment, string id)
        {
            var issue = await GetAsync(id);
            if(issue.Comments == null)
            {
                issue.Comments = new List<Comment>();
            }
            if(comment.Id == null)
            {
                comment.Id = ObjectId.GenerateNewId().ToString();
                comment.CreatedDate = DateTime.UtcNow;
                comment.UpdatedDate = DateTime.UtcNow;
            }
            issue.Comments.Add(comment);
            await UpdateAsync(id, issue);
            return await GetCommentsAsync(id);
        }

        public async Task<List<Comment>> GetCommentsAsync(string id)
        {
            var issue = await GetAsync(id);
            return issue?.Comments ?? new List<Comment>();
        }

        public async Task<List<Comment>> UpdateCommentAsync(Comment comment, string id)
        {
            var issue = await GetAsync(id);
            
            var dbComment = issue.Comments.FirstOrDefault(x=>x.Id == comment.Id);
            dbComment.Text = comment.Text;
            dbComment.UpdatedDate = DateTime.UtcNow;
            await UpdateAsync(id, issue);
            return await GetCommentsAsync(id);
        }

        public async Task<List<Comment>> DeleteCommentAsync(string issueId, string commentId)
        {
            var issue = await GetAsync(issueId);

            var comment = issue.Comments.FirstOrDefault(x => x.Id == commentId);
            issue.Comments.Remove(comment);

            await UpdateAsync(issueId, issue);

            return await GetCommentsAsync(issueId);
        }


        public async Task<IEnumerable<Issue>> GetBySprint(string sprintId)
        {
            return await _issueRepository.GetByProjectId(sprintId);
        }

        public async Task<IEnumerable<Issue>> FilterIssues(Filter filter) 
        {
            return await _issueRepository.FilterIssues(filter);
        }
    }
}
