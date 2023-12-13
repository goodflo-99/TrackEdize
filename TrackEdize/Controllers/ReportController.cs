using BusinessLogic;
using Microsoft.AspNetCore.Mvc;

namespace TrackEdize;


[Route("api/[controller]")]
[Route("api/[controller]/[action]")]
[ApiController]
public class ReportController : ControllerBase
{
    private readonly ReportingService _reportingService;

    public ReportController(ReportingService reportingService)
    {
        _reportingService = reportingService;
    }

    [HttpGet("{projectId}/ganttdata")]
    public async Task<IActionResult> GetGanttChartData(string projectId)
    {
        try
        {
            var ganttData = await _reportingService.GetGanttChartDataAsync(projectId);
            return Ok(ganttData);
        }
        catch (Exception ex)
        {
            // Handle any errors and return an appropriate response
            return StatusCode(500, new { error = "An error occurred while fetching Gantt chart data." });
        }
    }
    
}
