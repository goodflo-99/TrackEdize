using Common.Entities.SignalR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using TrackEdize.SignalR;
using TrackEdize.SignalR.HubConfig;

namespace TrackEdize.Controllers.SignalR
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly IHubContext<ChatHub> _hub;

        public ChatController(IHubContext<ChatHub> hub)
        {
            _hub = hub;
        }

        [HttpPost]
        public async Task<IActionResult> BroadcastMessage([FromBody] MessageDto msg)
        {
            
            _hub.Clients.All.SendAsync("Send", msg.User, msg.MsgText);

            return Ok();
        }



    }
}
