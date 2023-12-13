namespace Common;

public class GanttTask
{
    public string Name { get; set; }      // Task name or issue subject
    public DateTime StartDate { get; set; } // Start date of the task
    public DateTime EndDate { get; set; }   // End date of the task
    public string Status { get; set; }      // Task status (e.g., 'Open', 'In Progress', 'Completed')
    public string Type { get; set; }
}
