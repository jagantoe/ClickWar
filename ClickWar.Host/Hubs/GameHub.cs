using ClickWar.Host.Models;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace ClickWar.Host.Hubs
{
    public class GameHub: Hub
    {
        private readonly GameHandler _gameHandler;

        public GameHub(GameHandler gameHandler)
        {
            _gameHandler = gameHandler;
        }

        public async Task JoinTeam(string name, string team)
        {
            _gameHandler.AddFighter(name, team, Context.ConnectionId);
            await Clients.Caller.SendAsync("GetReady");
            await Clients.All.SendAsync("GetGameState", _gameHandler.GetGameState());
        }

        public async Task Attack()
        {
            var destroyed = _gameHandler.Attack(Context.ConnectionId);
            await Clients.All.SendAsync("GetGameState", _gameHandler.GetGameState());
            if (destroyed)
            {
                await Clients.All.SendAsync("GameOver");
            }
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            _gameHandler.RemoveFighter(Context.ConnectionId);
            Clients.All.SendAsync("GetGameState", _gameHandler.GetGameState());
            return base.OnDisconnectedAsync(exception);
        }
    }
}
