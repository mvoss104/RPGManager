//============================
// Copyright 2018-2020 Michael Voss
//
// Server-side object for combat rows, used for serialization and delivery.
//============================

using System;

namespace RPGManager.Models
{
    public class CombatRow: IComparable
    {
        /// <summary>
        /// The current initiative row of the character
        /// </summary>
        public int InitiativeCount { get; set; }

        /// <summary>
        /// The current location of the character on the battle map on the X axis
        /// </summary>
        public int LocationX { get; set; }

        /// <summary>
        /// The current location of the character on the battle map on the Y axis
        /// </summary>
        public int LocationY { get; set; }

        /// <summary>
        /// The character represented by this row
        /// </summary>
        public Character Actor { get; set; }

        /// <summary>
        /// Sort order puts the characters in the correct order on the initiative count
        /// </summary>
        /// <param name="other">the other character to compare to</param>
        /// <returns>1, 0, or -1 depending on how the two objects should sort together</returns>
        public int CompareTo(object other)
        {
            if(other as CombatRow == null)
            {
                return 0;
            }
            int ret = InitiativeCount.CompareTo(((CombatRow)other).InitiativeCount) * -1;
            if (ret == 0)
            {
                ret = Actor.Dexterity.CompareTo(((CombatRow)other).Actor.Dexterity);
            }
            if (ret == 0)
            {
                ret = Actor.Name.CompareTo(((CombatRow)other).Actor.Name);
            }
            return ret;
        }
    }
}