using Common.Constants;
using Common.Entities.SignalR;
using Database.Entities.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Entities
{
    public class Chat : BaseEntity
    {
        public string ChatName { get; set; }

        public ChatType ChatType { get; set; }

        public List<MessageDto> Messages { get; set; } = new List<MessageDto>();
    }
}
