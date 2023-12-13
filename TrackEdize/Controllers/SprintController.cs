using BusinessLogic;
using Database;
using Microsoft.AspNetCore.Mvc;
using TrackEdize.Controllers.CRUDController;

namespace TrackEdize;

[Route("api/[controller]")]
[Route("api/[controller]/[action]")]
public class SprintController : CRUDController<SprintService, Sprint>
{
    public SprintController(SprintService service) : base(service)
    {
    }

    [HttpGet("GetByProject")]
    [ActionName("GetByProject")]
    public async Task<IActionResult> GetByProject(string id)
    {
        return Ok(await _service.GetByProject(id));
    }

    [HttpGet("LastSprintByProject")]
    [ActionName("LastSprintByProject")]
    public async Task<IActionResult> GetLastSprintByProject(string id)
    {
        return Ok(await _service.GetLastSprintNumber(id));
    }



}
