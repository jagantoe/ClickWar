namespace ClickWar.Host.Models.Meeting
{
    public class Meeting
    {
        public int Id { get; set; }

        public string MeetingText { get; set; } = string.Empty;

        public void AddText(string text)
        {
            MeetingText += text;
        }
    }
}
