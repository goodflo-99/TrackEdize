using Common.Entities.SignalR;

namespace TrackEdize.SignalR.Interfaces
{
    public interface IChatClient
    {
        Task Send(string user, string message);
        Task Send(MessageDto message);
    }
}
