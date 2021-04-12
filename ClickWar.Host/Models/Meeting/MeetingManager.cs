using System;
using System.Collections.Generic;
using System.Linq;

namespace ClickWar.Host.Models.Meeting
{
    public class MeetingManager
    {
        private List<Meeting> Meetings;
        private List<MeetingConnection> MeetingConnections;

        public MeetingManager()
        {
            Meetings = new List<Meeting>();
            MeetingConnections = new List<MeetingConnection>();
        }

        public bool JoinMeeting(string connectionId ,int meetingid, int role, int device)
        {
            var meeting = Meetings.SingleOrDefault(_ => _.Id == meetingid);
            if (meeting == null && !StartMeeting(meetingid)) return false;
            var connection = new MeetingConnection() { ConnectionId = connectionId, MeetingId = meetingid, Role = role, Device = device };
            MeetingConnections.Add(connection);
            return true;
        }

        private bool StartMeeting(int id)
        {
            // Get meeting from database
            // If it is started/active add it to meetings
            // If it is not active return false and dont add connection
            if (new Random().Next() % 2 == 0) return false;
            var meeting = new Meeting() { Id = id };
            Meetings.Add(meeting);
            return true;
        }

        public Meeting this[string connectionId]
        {
            get {
                var id = MeetingConnections.SingleOrDefault(_ => _.ConnectionId == connectionId).MeetingId;
                return Meetings.SingleOrDefault(_ => _.Id == id);
            }
        }
    }
}
