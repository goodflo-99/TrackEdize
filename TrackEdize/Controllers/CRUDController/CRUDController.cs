using Database.Entities.Base;
using Database.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TrackEdize.Controllers.CRUDController
{
    //[Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CRUDController<T,U> : ControllerBase where T : BaseCRUDService<U> where U : BaseEntity
    {
        protected T _service;
        public CRUDController(T service) : base()
        {
            _service = service;
        }

        // GET: api/<IssueController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _service.GetAsync());
        }

        // GET api/<IssueController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            return Ok(await _service.GetAsync(id));
        }

        // POST api/<IssueController>
        [HttpPost]
        public async Task<IActionResult> Add([FromBody] U value)
        {
            await _service.CreateAsync(value);
            return Ok(value);
        }

        // PUT api/<IssueController>/5
        [HttpPut]
        public async Task<IActionResult> Update([FromBody] U value)
        {
            await _service.UpdateAsync(value.Id, value);
            return Ok(value);
        }

        // DELETE api/<IssueController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            await _service.RemoveAsync(id);
            return Ok();
        }
    }
}
