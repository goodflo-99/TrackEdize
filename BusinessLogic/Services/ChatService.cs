using BusinessLogic.Services.Base;
using Database.Entities;
using Database.Interfaces;
using Database.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Services
{
    public class ChatService : BaseCRUDService<Chat>
    {
        private ChatRepository _chatRepository;
        public ChatService(ChatRepository repository, string collectionName) : base(repository, collectionName)
        {
            _chatRepository = repository;
        }

        public Task<Chat> GetAllChat()
        {
            return _chatRepository.GetAllChat();
        }
    }
}
