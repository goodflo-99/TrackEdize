using Database.Entities.Base;

namespace Database;

public class Sprint : BaseEntity
{
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public string? Status { get; set; }
    public string ProjectId { get;set; }
    public string Title { get;set; }
}
