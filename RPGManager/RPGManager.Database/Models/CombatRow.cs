//============================
// Copyright 2018 Michael Voss
//
// Server-side object for combat rows, used for serialization and delivery.
//============================

using System;

namespace RPGManager.Models
{
    public class CombatRow: IComparable
    {
        public int InitiativeCount { get; set; }

        public Character Actor { get; set; }

        public int CompareTo(object other)
        {
            if(other as CombatRow == null)
            {
                return 0;
            }
            int ret = InitiativeCount.CompareTo(((CombatRow)other).InitiativeCount) * -1;
            // TODO: Compare Dexterity scores when possible.
            if(ret == 0)
            {
                ret = Actor.Name.CompareTo(((CombatRow)other).Actor.Name);
            }
            return ret;
        }
    }
}