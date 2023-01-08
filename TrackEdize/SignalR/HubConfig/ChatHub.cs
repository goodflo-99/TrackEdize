using Microsoft.AspNetCore.SignalR;

namespace TrackEdize.SignalR.HubConfig
{
    public class ChatHub : Hub
    {
        public async Task SendToAll(string message)
        {

            await Clients.All.SendAsync("Send", message);
        }
    }
}
