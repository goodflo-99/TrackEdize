using BusunessLogic.Services;
using Database.Entities;
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

        [HttpPost("AddComment")]
        public async Task<IActionResult> AddComment([FromBody]Comment comment, string id)
        {
            return Ok(await _service.AddCommentAsync(comment, id));
        }

        [HttpPut("Comment")]
        public async Task<IActionResult> Comment([FromBody] Comment comment, string id)
        {
            return Ok(await _service.UpdateCommentAsync(comment, id));
        }

        [HttpGet("GetComments")]
        public async Task<IActionResult> GetComments(string id)
        {
            return Ok(await _service.GetCommentsAsync(id));
        }
    }
}
