using BusinessLogic.Services;
using Common.Entities.SignalR;
using Database.Entities.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using TrackEdize.SignalR;
using TrackEdize.SignalR.HubConfig;
using TrackEdize.SignalR.Interfaces;

namespace TrackEdize.Controllers.SignalR
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ChatController : ControllerBase
    {
        private readonly IHubContext<ChatHub, IChatClient> _hub;

        private readonly UserManager<ApplicationUser> _userManager;

        private readonly ChatService _chatService;

        public ChatController(IHubContext<ChatHub, IChatClient> hub, UserManager<ApplicationUser> userManager, ChatService chatService)
        {
            _hub = hub;
            _userManager = userManager;
            _chatService = chatService;
        }

        [HttpPost, HttpPut]
        public async Task<IActionResult> BroadcastMessage([FromBody] MessageDto msg)
        {
            var chat = await _chatService.GetAllChat();
            var user = await _userManager.GetUserAsync(User);
            
            msg.User = user.FullName;
            chat.Messages.Add(msg);
            await _chatService.UpdateAsync(chat);
            _hub.Clients.All.Send(user.FullName, msg.MsgText);
            return Ok(msg);
        }

        //[HttpPost]
        //public async Task<IActionResult> BroadcastMessage([FromBody] string msgText)
        //{
        //    MessageDto msg = new MessageDto()
        //    {
        //        MsgText = msgText
        //    };

        //    return await BroadcastMessage(msg);
        //}



    }
}
