//============================
// Copyright 2018 Michael Voss
//
// Server-side object for characters, used for serialization and delivery.
//============================


using Newtonsoft.Json;
using RPGManager.Models;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Web.Configuration;

namespace RPGManager.Database
{
    public static class Combat
    {
        private const string s_fileLoc = "C:\\RPGManager\\Combat";

        public static List<string> GetCombats()
        {
            List<string> ret = new List<string>();

            foreach(string file in Directory.GetFiles(s_fileLoc))
            {
                ret.Add(file);
            }

            return ret;
        }

        public static void SaveCombat(CombatRow current, List<CombatRow> allRows, string fileName)
        {
            using (FileStream st = new FileStream(s_fileLoc + Path.DirectorySeparatorChar + fileName, FileMode.Create))
            {
                using (StreamWriter stw = new StreamWriter(st))
                {
                    stw.Write(JsonConvert.SerializeObject(new CombatSave() { Rows = allRows, Current = current }));
                }
            }
        }

        public static CombatSave LoadCombat(string fileName)
        {
            using (FileStream st = new FileStream(s_fileLoc + Path.DirectorySeparatorChar + fileName, FileMode.Open))
            {
                using (StreamReader str = new StreamReader(st))
                {
                    return JsonConvert.DeserializeObject<CombatSave>(str.ReadToEnd());
                }
            }
        }
    }
}
