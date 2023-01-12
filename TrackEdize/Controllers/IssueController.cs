using BusinessLogic.Services;
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

        /// <summary>
        /// 
        /// </summary>
        /// <param name="comment"></param>
        /// <param name="id">Issue id</param>
        /// <returns></returns>
        [HttpPost("AddComment")]
        public async Task<IActionResult> AddComment([FromBody]Comment comment, string id)
        {
            return Ok(await _service.AddCommentAsync(comment, id));
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="comment"></param>
        /// <param name="id">Issue id</param>
        /// <returns></returns>
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

        [HttpDelete("DeleteComment")]
        public async Task<IActionResult> DeleteComment(string issueId, string commentId)
        {
            return Ok(await _service.DeleteCommentAsync(issueId, commentId));
        }
    }
}
