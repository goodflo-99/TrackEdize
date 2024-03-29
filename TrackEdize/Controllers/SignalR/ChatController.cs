﻿using BusinessLogic.Services;
using Common.Entities.SignalR;
using Database.Entities.Identity;
using Humanizer;
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
    [Route("api/[controller]/[action]")]
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

        [HttpGet("")]
        public async Task<IActionResult> Get()
        {
            var chat = await _chatService.GetAllChat();

            return Ok(chat);
        }


        [HttpGet("History")]
        public async Task<IActionResult> GetHistory()
        {
            var chat = await _chatService.GetAllChat();

            return Ok(chat.Messages);
        }

        [HttpPost, HttpPut]
        public async Task<IActionResult> BroadcastMessage([FromBody] MessageDto msg)
        {
            var chat = await _chatService.GetAllChat();
            var user = await _userManager.GetUserAsync(User);
            
            msg.User = user.FullName;
            msg.Id = user.Id;
            chat.Messages.Add(msg);
            await _chatService.UpdateAsync(chat);
            _hub.Clients.All.Send(msg);
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
