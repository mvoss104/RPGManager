//============================
// Copyright 2018 Michael Voss
//
// Server-side object for characters, used for serialization and delivery.
//============================

namespace RPGManager.Models
{
    public class Character
    {
        /// <summary>
        /// Static source of ID assignment. Increments as each character is instantiated.
        /// </summary>
        private static int s_id = 0;

        /// <summary>
        /// ID of a given character. Generated each time the character is instantiated.
        /// </summary>
        public int Id
        {
            get
            {
                if(_id == -1)
                {
                    _id = s_id++;
                }
                return _id;
            }
            set
            {
                if(value >= s_id)
                {
                    s_id = value + 1;
                }
                _id = value;
            }
        }
        private int _id = -1;

        public string Name { get; set; }

        public string Portrait { get; set; }

        public int ClassPowerHitPoints { get; set; }

        public int TemporaryHitPoints { get; set; }

        public int EnhancedHitPoints { get; set; }

        public int CurrentHitPoints { get; set; }

        public int MaxHitPoints { get; set; }

        public int Strength { get; set; }

        public int Dexterity { get; set; }

        public int Constitution { get; set; }

        public int Intelligence { get; set; }

        public int Wisdom { get; set; }

        public int Charisma { get; set; }

        public void ApplyDamage(int damageAmount)
        {
            if(ClassPowerHitPoints > damageAmount)
            {
                ClassPowerHitPoints -= damageAmount;
                return;
            }
            else
            {
                damageAmount -= ClassPowerHitPoints;
                ClassPowerHitPoints = 0;
            }
            if(TemporaryHitPoints > damageAmount)
            {
                TemporaryHitPoints -= damageAmount;
                return;
            }
            else
            {
                damageAmount -= TemporaryHitPoints;
                TemporaryHitPoints = 0;
            }
            CurrentHitPoints -= damageAmount;
            if(CurrentHitPoints < 0)
            {
                CurrentHitPoints = 0;
            }
        }

        public void ApplyHealing(int healingAmount)
        {
            CurrentHitPoints += healingAmount;
            if(CurrentHitPoints > MaxHitPoints + EnhancedHitPoints)
            {
                CurrentHitPoints = MaxHitPoints + EnhancedHitPoints;
            }
        }
    }
}