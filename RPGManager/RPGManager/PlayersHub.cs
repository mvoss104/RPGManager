//using Microsoft.AspNet.SignalR;
//using RPGManager.Controllers;
//using RPGManager.Models;
//using System.Linq;

//namespace RPGManager
//{
//    public class PlayersHub : Hub
//    {
//        public void AddCharacter(Character toAdd, int initiative)
//        {
//            HomeController.s_Rows.Add(new CombatRow()
//            {
//                Actor = toAdd,
//                InitiativeCount = initiative
//            });
//            HomeController.s_Rows.Sort();
//            Clients.All.addCharacter(toAdd, initiative);
//        }

//        public void DamageCharacter(int id, int damage)
//        {
//            foreach (CombatRow row in HomeController.s_Rows)
//            {
//                if (id == row.Actor.Id)
//                {
//                    row.Actor.ApplyDamage(damage);
//                    Clients.All.updateCharacter(row.Actor);
//                    break;
//                }
//            }
//        }

//        public void HealCharacter(int id, int hitPoints)
//        {
//            foreach (CombatRow row in HomeController.s_Rows)
//            {
//                if (id == row.Actor.Id)
//                {
//                    row.Actor.ApplyHealing(hitPoints);
//                    Clients.All.updateCharacter(row.Actor);
//                    break;
//                }
//            }
//        }

//        public void AddTempHp(int id, int hitPoints)
//        {
//            foreach (CombatRow row in HomeController.s_Rows)
//            {
//                if (id == row.Actor.Id)
//                {
//                    row.Actor.TemporaryHitPoints = hitPoints;
//                    Clients.All.updateCharacter(row.Actor);
//                    break;
//                }
//            }
//        }

//        public void AddClassHp(int id, int hitPoints)
//        {
//            foreach (CombatRow row in HomeController.s_Rows)
//            {
//                if (id == row.Actor.Id)
//                {
//                    row.Actor.ClassPowerHitPoints = hitPoints;
//                    Clients.All.updateCharacter(row.Actor);
//                    break;
//                }
//            }
//        }

//        public void AddEnhancedHp(int id, int hitPoints)
//        {
//            foreach (CombatRow row in HomeController.s_Rows)
//            {
//                if (id == row.Actor.Id)
//                {
//                    row.Actor.EnhancedHitPoints = hitPoints;
//                    row.Actor.ApplyHealing(hitPoints);
//                    Clients.All.updateCharacter(row.Actor);
//                    break;
//                }
//            }
//        }

//        public void NextInitiative()
//        {
//            if (HomeController.s_Rows.Count == 0)
//            {
//                return;
//            }
//            if (HomeController.s_CurrentRow == null || !HomeController.s_Rows.Contains(HomeController.s_CurrentRow))
//            {
//                HomeController.s_CurrentRow = HomeController.s_Rows.First();
//            }
//            else
//            {
//                int index = HomeController.s_Rows.IndexOf(HomeController.s_CurrentRow) + 1;
//                if(index >= HomeController.s_Rows.Count)
//                {
//                    index = 0;
//                }
//                HomeController.s_CurrentRow = HomeController.s_Rows[index];
//            }
//            Clients.All.updateInitiative(HomeController.s_CurrentRow.Actor.Id);
//        }

//        public void PrevInitiative()
//        {
//            if (HomeController.s_Rows.Count == 0)
//            {
//                return;
//            }
//            if (HomeController.s_CurrentRow == null || !HomeController.s_Rows.Contains(HomeController.s_CurrentRow))
//            {
//                HomeController.s_CurrentRow = HomeController.s_Rows.Last();
//            }
//            else
//            {
//                int index = HomeController.s_Rows.IndexOf(HomeController.s_CurrentRow) - 1;
//                if (index < 0)
//                {
//                    index = HomeController.s_Rows.Count - 1;
//                }
//                HomeController.s_CurrentRow = HomeController.s_Rows[index];
//            }
//            Clients.All.updateInitiative(HomeController.s_CurrentRow.Actor.Id);
//        }

//        public void RemoveCharacter(int id)
//        {
//            CombatRow toRemove = null;
//            foreach (CombatRow row in HomeController.s_Rows)
//            {
//                if (id == row.Actor.Id)
//                {
//                    toRemove = row;
//                    break;
//                }
//            }
//            if (toRemove != null)
//            {
//                HomeController.s_Rows.Remove(toRemove);
//                Clients.All.removeCharacter(id);
//            }
//        }
//    }
//}