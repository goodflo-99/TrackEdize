using BusinessLogic.Services.Base;
using Database;
using Database.Interfaces;

namespace BusinessLogic;

public class SprintService : BaseCRUDService<Sprint>
{
    private SprintRepository _sprintRepository;
    public SprintService(SprintRepository repository) : base(repository, nameof(Sprint))
    {
        _sprintRepository = repository;
    }

    public async Task<IEnumerable<Sprint>> GetByProject(string projectId)
    {
        return await _sprintRepository.GetByProjectId(projectId);
    }

    public async Task<int> GetLastSprintNumber(string projectId)
    {
        int count = 0;
        try 
        {
            var sprints = await _sprintRepository.GetByProjectId(projectId);
            count = sprints.Count();

        } catch(Exception e) { }
        return count;
    }
}
