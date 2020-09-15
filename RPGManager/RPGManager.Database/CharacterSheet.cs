using Newtonsoft.Json;
using RPGManager.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RPGManager.Database
{
    public static class CharacterSheets
    {
        private static string s_fileLoc = "C:\\RPGManager\\Characters";

        public static List<string> GetCharacters()
        {
            List<string> ret = new List<string>();

            foreach (string file in Directory.GetFiles(s_fileLoc))
            {
                ret.Add(file);
            }

            return ret;
        }

        public static void SaveCombat(Character character, string fileName)
        {
            using (FileStream st = new FileStream(s_fileLoc + Path.DirectorySeparatorChar + fileName, FileMode.Create))
            {
                using (StreamWriter stw = new StreamWriter(st))
                {
                    stw.Write(JsonConvert.SerializeObject(character));
                }
            }
        }

        public static Character LoadCharacter(string fileName)
        {
            using (FileStream st = new FileStream(s_fileLoc + Path.DirectorySeparatorChar + fileName, FileMode.Open))
            {
                using (StreamReader str = new StreamReader(st))
                {
                    return JsonConvert.DeserializeObject<Character>(str.ReadToEnd());
                }
            }
        }
    }
}
