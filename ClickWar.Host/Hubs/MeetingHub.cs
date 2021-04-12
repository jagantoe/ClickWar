using ClickWar.Host.Models.Meeting;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace ClickWar.Host.Hubs
{
    public class MeetingHub: Hub
    {
        private readonly MeetingManager _meetingManager;

        public MeetingHub(MeetingManager meetingManager)
        {
            _meetingManager = meetingManager;
        }

        public async Task JoinMeeting(int meetingId, int role, int device)
        {
            var response = _meetingManager.JoinMeeting(Context.ConnectionId, meetingId, role, device);
            if (response == false)
            {
                Context.Abort();
            }
            else
            {
                await Clients.All.SendAsync("GetMeetingState", _meetingManager[Context.ConnectionId]);
            }
        }

        public async Task AddText(string text)
        {
            _meetingManager[Context.ConnectionId].AddText(text);
            await Clients.All.SendAsync("GetMeetingState", _meetingManager[Context.ConnectionId]);
        }
    }
}
