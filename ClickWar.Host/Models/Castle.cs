﻿namespace ClickWar.Host.Models
{
    public class Castle
    {
        public int Health { get; set; }

        public bool Destroyed => Health == 0;

        public bool TakeDamage(int damage)
        {
            Health -= damage;
            if (Health < 0) Health = 0;
            return Destroyed;
        }
    }
}
