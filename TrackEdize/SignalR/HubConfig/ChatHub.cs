using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using TrackEdize.SignalR.Interfaces;

namespace TrackEdize.SignalR.HubConfig
{
    [Authorize]
    public class ChatHub : Hub<IChatClient>
    {
        public async Task SendToAll(string user, string message)
        {
            Clients.All.Send(user, message);
        }

        public override Task OnConnectedAsync()
        {
            Groups.AddToGroupAsync(Context.ConnectionId, Context.User.Identity.Name);
            return base.OnConnectedAsync();
        }
    }
}
