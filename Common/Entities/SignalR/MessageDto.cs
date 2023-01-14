namespace Common.Entities.SignalR
{
    public class MessageDto
    {
        public string? Id {get;set;}
        public string User { get; set; } = "";
        public string MsgText { get; set; } = "";
    }
}
