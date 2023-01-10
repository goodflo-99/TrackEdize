namespace TrackEdize.SignalR.Interfaces
{
    public interface IChatClient
    {
        Task Send(string user, string message);
    }
}
