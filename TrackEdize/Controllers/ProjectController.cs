using BusunessLogic.Services;
using Database.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TrackEdize.Controllers.CRUDController;

namespace TrackEdize.Controllers
{
    [Route("api/[controller]")]
    public class ProjectController : CRUDController<ProjectService, Project>
    {
        public ProjectController(ProjectService service) : base(service)
        {
        }
    }
}
