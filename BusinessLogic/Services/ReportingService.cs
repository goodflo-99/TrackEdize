using Common;
using Database;
using Database.Entities;
using MongoDB.Driver;

namespace BusinessLogic;

public class ReportingService
{
    private readonly IMongoDatabase _database;

    public ReportingService(IMongoDatabase database)
    {
        _database = database;
    }

    public async Task<List<GanttTask>> GetGanttChartDataAsync(string projectId)
    {
        var issuesCollection = _database.GetCollection<Issue>("issues");
        var sprintsCollection = _database.GetCollection<Sprint>("sprints");

        // Fetch issues for the specified project
        var issues = await issuesCollection
            .Find(Builders<Issue>.Filter.Eq("Project.Id", projectId))
            .ToListAsync();

        // Fetch sprints for the specified project
        var sprints = await sprintsCollection
            .Find(Builders<Sprint>.Filter.Eq("ProjectId", projectId))
            .ToListAsync();

        // Prepare Gantt chart data based on issues and sprints
        var ganttData = new List<GanttTask>();

        foreach (var sprint in sprints)
        {
            var tasksInSprint = issues
                .Where(issue => issue.SprintId == sprint.Id)
                .Select(issue => new GanttTask
                {
                    Name = issue.Subject,
                    StartDate = issue.StartDate ?? sprint.StartDate ?? new DateTime(),
                    EndDate = issue.EndDate ?? sprint.EndDate ?? new DateTime(),
                    Status = issue.Status,
                    Type = issue.Type
                    // You can add more properties to GanttTask as needed
                });

            ganttData.AddRange(tasksInSprint);
        }

        return ganttData;
    }

}
