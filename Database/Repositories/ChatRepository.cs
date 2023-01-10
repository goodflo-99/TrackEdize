using Database.Entities;
using Database.Interfaces;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Driver;
using Common.Constants;

namespace Database.Repositories
{
    public class ChatRepository : BaseRepository<Chat>
    {
        public ChatRepository(IOptions<DatabaseSettings> dbSettings) : base(dbSettings)
        {
        }

        public async Task<Chat> GetAllChat()
        {
            var chat = _collection.Find(x => x.ChatType == ChatType.All).FirstOrDefault();

            if(chat == null)
            {
                chat = new Chat();
                chat.ChatType = ChatType.All;
                chat.ChatName = "Public Chat";

                await CreateAsync(chat);
            }

            return chat;
        }
    }
}
