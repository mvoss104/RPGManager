using Microsoft.AspNet.SignalR;
using RPGManager.Models;
using System.Collections.Generic;
using System.Linq;

namespace RPGManager
{
    public class PlayersHub : Hub
    {
        public static CombatRow s_CurrentRow;
        public static List<CombatRow> s_Rows = new List<CombatRow>();

        public void AddCharacter(Character toAdd, int initiative)
        {
            s_Rows.Add(new CombatRow()
            {
                Actor = toAdd,
                InitiativeCount = initiative
            });
            s_Rows.Sort();
            Clients.All.addCharacter(toAdd, initiative);
        }

        public void DamageCharacter(int id, int damage)
        {
            foreach (CombatRow row in s_Rows)
            {
                if (id == row.Actor.Id)
                {
                    row.Actor.ApplyDamage(damage);
                    Clients.All.updateCharacter(row.Actor);
                    break;
                }
            }
        }

        public void HealCharacter(int id, int hitPoints)
        {
            foreach (CombatRow row in s_Rows)
            {
                if (id == row.Actor.Id)
                {
                    row.Actor.ApplyHealing(hitPoints);
                    Clients.All.updateCharacter(row.Actor);
                    break;
                }
            }
        }

        public CombatRow[] GetCharacters()
        {
            return s_Rows.ToArray();
        }

        public void AddTempHp(int id, int hitPoints)
        {
            foreach (CombatRow row in s_Rows)
            {
                if (id == row.Actor.Id)
                {
                    row.Actor.TemporaryHitPoints = hitPoints;
                    Clients.All.updateCharacter(row.Actor);
                    break;
                }
            }
        }

        public void AddClassHp(int id, int hitPoints)
        {
            foreach (CombatRow row in s_Rows)
            {
                if (id == row.Actor.Id)
                {
                    row.Actor.ClassPowerHitPoints = hitPoints;
                    Clients.All.updateCharacter(row.Actor);
                    break;
                }
            }
        }

        public void AddEnhancedHp(int id, int hitPoints)
        {
            foreach (CombatRow row in s_Rows)
            {
                if (id == row.Actor.Id)
                {
                    row.Actor.EnhancedHitPoints = hitPoints;
                    row.Actor.ApplyHealing(hitPoints);
                    Clients.All.updateCharacter(row.Actor);
                    break;
                }
            }
        }

        public void NextInitiative()
        {
            if (s_Rows.Count == 0)
            {
                return;
            }
            if (s_CurrentRow == null || !s_Rows.Contains(s_CurrentRow))
            {
                s_CurrentRow = s_Rows.First();
            }
            else
            {
                int index = s_Rows.IndexOf(s_CurrentRow) + 1;
                if (index >= s_Rows.Count)
                {
                    index = 0;
                }
                s_CurrentRow = s_Rows[index];
            }
            Clients.All.updateInitiative(s_CurrentRow.Actor.Id);
        }

        public void PrevInitiative()
        {
            if (s_Rows.Count == 0)
            {
                return;
            }
            if (s_CurrentRow == null || !s_Rows.Contains(s_CurrentRow))
            {
                s_CurrentRow = s_Rows.Last();
            }
            else
            {
                int index = s_Rows.IndexOf(s_CurrentRow) - 1;
                if (index < 0)
                {
                    index = s_Rows.Count - 1;
                }
                s_CurrentRow = s_Rows[index];
            }
            Clients.All.updateInitiative(s_CurrentRow.Actor.Id);
        }

        public void RemoveCharacter(int id)
        {
            CombatRow toRemove = null;
            foreach (CombatRow row in s_Rows)
            {
                if (id == row.Actor.Id)
                {
                    toRemove = row;
                    break;
                }
            }
            if (toRemove != null)
            {
                s_Rows.Remove(toRemove);
                Clients.All.removeCharacter(id);
            }
        }
    }
}