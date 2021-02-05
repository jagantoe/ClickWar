using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClickWar.Host.Models
{
    public class ChatRoom
    {
        public ChatRoom()
        {
            Messages = new List<ChatMessage>();
        }
        public IList<ChatMessage> Messages { get; set; }
    }
}
