using Database.Entities;
using Database.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TrackEdize.Controllers.CRUDController;

namespace TrackEdize.Controllers
{
    [Route("api/[controller]")]
    public class IssueController : CRUDController<IssueService, Issue>
    {
        public IssueController(IssueService service) : base(service)
        {
        }
    }
}
