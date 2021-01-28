using System.Collections.Generic;

namespace ClickWar.Host.Models
{
    public class GameState
    {
        public string Winner { get; set; }
        public Castle RedCastle { get; set; }
        public Castle BlueCastle { get; set; }
        public List<Fighter> Fighters { get; set; }
    }
}
