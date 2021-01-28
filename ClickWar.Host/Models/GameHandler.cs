using System.Collections.Generic;
using System.Linq;

namespace ClickWar.Host.Models
{
    public class GameHandler
    {
        public Castle RedCastle { get; set; }
        public Castle BlueCastle { get; set; }
        public List<Fighter> Fighters { get; set; }


        public GameHandler()
        {
            RedCastle = new Castle() { Health = 100 };
            BlueCastle = new Castle() { Health = 100 };
            Fighters = new List<Fighter>();
        }

        public void AddFighter(string name, string team, string connectionId)
        {
            Fighters.Add(new Fighter() { ConnectionId = connectionId, Name = name, Team = team, Power = 1 });
        }

        public void RemoveFighter(string connectionId)
        {
            var fighter = Fighters.SingleOrDefault(_ => _.ConnectionId == connectionId);
            if (fighter != null) Fighters.Remove(fighter);
        }

        public void Attack(string connectionId)
        {
            var fighter = Fighters.SingleOrDefault(_ => _.ConnectionId == connectionId);
            if (fighter != null)
            {
                if (fighter.Team == "red")
                {
                    BlueCastle.TakeDamage(fighter.Power);
                }
                else if (fighter.Team == "blue")
                {
                    RedCastle.TakeDamage(fighter.Power);
                }
            }
        }

        public GameState GetGameState()
        {
            return new GameState()
            {
                Winner = GetWinner(),
                RedCastle = RedCastle,
                BlueCastle = BlueCastle,
                Fighters = Fighters
            };
        }

        public string GetWinner()
        {
            if (BlueCastle.Destroyed) return "red";
            else if (RedCastle.Destroyed) return "blue";
            return null;
        }
    }
}
