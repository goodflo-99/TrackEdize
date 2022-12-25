using Database.Entities;
using Database.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TrackEdize.Controllers.CRUDController;

namespace TrackEdize.Controllers
{
    [Route("api/[controller]")]
    [Route("api/[controller]/[action]")]
    public class IssueController : CRUDController<IssueService, Issue>
    {
        public IssueController(IssueService service) : base(service)
        {

        }

        [HttpGet("GetByProject")]
        [ActionName("GetByProject")]
        public async Task<IActionResult> GetByProject(string id)
        {
            return Ok(await _service.GetByProject(id));
        }
    }
}
