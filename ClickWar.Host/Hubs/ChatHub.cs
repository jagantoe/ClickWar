using ClickWar.Host.Models;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClickWar.Host.Hubs
{
    public class ChatHub: Hub
    {
        public ChatRoom Chat { get; set; }
        public ChatHub(ChatRoom chat)
        {
            Chat = chat;
        }

        public override Task OnConnectedAsync()
        {
            Clients.Caller.SendAsync("AllMessages", Chat.Messages);
            Context.Items.Add(Context.ConnectionId, new Random().Next());
            return base.OnConnectedAsync();
        }

        public async Task Message(string name, string message)
        {
            var chatMessage = new ChatMessage() { Name = name, Message = message };
            var x = Context.Items.Single(_ => _.Key == Context.ConnectionId);
            chatMessage.Message += x;
            Chat.Messages.Add(chatMessage);
            await Clients.All.SendAsync("NewMessage", chatMessage);
        }
    }
}
