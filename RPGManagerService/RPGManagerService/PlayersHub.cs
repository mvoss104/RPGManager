using Microsoft.AspNet.SignalR;
using RPGManager.Database.Models;
using RPGManager.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RPGManager
{
    public class PlayersHub : Hub
    {
        public static CombatRow s_CurrentRow;
        public static List<CombatRow> s_Rows = new List<CombatRow>();
        public static List<Tuple<uint, uint>> s_Walls = new List<Tuple<uint, uint>>();

        public static Random randSeed = new Random();

        public void RollDice(int characterId, string diceRequest)
        {
            string[] diceColors = null;
            string diceForeground = null;
            foreach (CombatRow row in s_Rows)
            {
                if (characterId == row.Actor.Id)
                {
                    diceColors = row.Actor.DiceColors;
                    diceForeground = row.Actor.DiceForeground;
                    break;
                }
            }
            if (diceColors == null)
            {
                diceColors = new string[] { "#FFFFFF" };
                diceForeground = "#000000";
            }
            string[] diceSets = diceRequest.Split(',');
            foreach(string diceSet in diceSets)
            {
                RollSingleDiceSet(characterId, diceSet, diceColors, diceForeground);
            }
        }

        private void RollSingleDiceSet(int characterId, string diceRequest, string[] diceColors, string diceForeground)
        {
            int result = 0;
            List<Die> dieResult = new List<Die>();

            char lastSign = '+';
            while (diceRequest.Length > 0)
            {
                int math = diceRequest.IndexOfAny(new char[] { '+', '-' });
                string piece;
                char sign = lastSign;
                if (math >= 0)
                {
                    piece = diceRequest.Substring(0, math);
                    lastSign = diceRequest[math];
                    diceRequest = diceRequest.Substring(math + 1);
                }
                else
                {
                    piece = diceRequest;
                    diceRequest = string.Empty;
                    lastSign = '+';
                }
                if (piece.Length == 0)
                {
                    continue;
                }
                string[] splitPiece = piece.Split('d');
                if (splitPiece.Length == 1)
                {
                    if (int.TryParse(splitPiece[0], out int calcPiece))
                    {
                        if (sign == '+')
                        {
                            result += calcPiece;
                        }
                        else
                        {
                            result -= calcPiece;
                        }
                    }
                }
                else if (splitPiece.Length == 2)
                {
                    if (sign == '+')
                    {
                        result += RollSingleDie(splitPiece[0], splitPiece[1], dieResult, diceColors, diceForeground);
                    }
                    else
                    {
                        result -= RollSingleDie(splitPiece[0], splitPiece[1], dieResult, diceColors, diceForeground);
                    }
                }
            }
            Clients.All.rollDice(characterId, dieResult, result);
        }

        private int RollSingleDie(string numberInput, string typeInput, List<Die> dieResult, string[] dieColor, string textColor)
        {
            int result = 0;
            if (Enum.TryParse(typeInput, out DiceType diceRolled))
            {
                bool parsed = int.TryParse(numberInput, out int diceNumber);
                if(!parsed)
                {
                    diceNumber = 1;
                }
                for (int c = 0; c < diceNumber; c++)
                {
                    int currentRoll = randSeed.Next((int)diceRolled) + 1;
                    dieResult.Add(new Die()
                    {
                        Colors = dieColor,
                        DieType = diceRolled,
                        TextColor = textColor,
                        Value = currentRoll
                    });
                    result += currentRoll;
                }
            }
            return result;
        }

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

        public Tuple<uint, uint>[] GetWalls()
        {
            return s_Walls.ToArray();
        }

        public void AddWall(uint x, uint y)
        {
            s_Walls.Add(new Tuple<uint, uint>(x, y));
            Clients.All.addWall(x, y);
        }

        public void RemoveWall(uint x, uint y)
        {
            Tuple<uint, uint> foundWall = null;
            foreach (Tuple<uint, uint> wall in s_Walls)
            {
                if(wall.Item1 == x && wall.Item2 == y)
                {
                    foundWall = wall;
                    break;
                }
            }
            if(foundWall != null)
            {
                s_Walls.Remove(foundWall);
            }
            Clients.All.removeWall(x, y);
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

        public void UpdateCombatRow(int charId, int? init, int x, int y)
        {
            foreach (CombatRow row in s_Rows)
            {
                if (row.Actor.Id == charId)
                {
                    row.LocationX = x;
                    row.LocationY = y;
                    if (init != null && row.InitiativeCount != init)
                    {
                        row.InitiativeCount = (int)init;
                        s_Rows.Sort();
                    }
                    break;
                }
            }
            Clients.All.updateCombatRow(charId, init, x, y);
        }
    }
}