using RPGManager.Database;
using RPGManager.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace RPGManager.Controllers
{
    public class HomeController: Controller
    {
        public static CombatRow s_CurrentRow;
        public static List<CombatRow> s_Rows;

        static HomeController()
        {
            s_Rows = new List<CombatRow>();
        }

        public ViewResult Index(string id)
        {
            return new ViewResult();
        }
        
        public JsonResult GetRows()
        {
            return new JsonResult() {
                JsonRequestBehavior = JsonRequestBehavior.AllowGet,
                Data = s_Rows
            };
        }

        public JsonResult GetPortraits()
        {
            string filePath = Server.MapPath(Url.Content("~/Content/Images/Portraits/"));

            List<string> portraits = new List<string>();

            foreach(string subPath in Directory.GetDirectories(filePath))
            {
                foreach(string portrait in Directory.GetFiles(subPath))
                {
                    string[] subPathSplit = subPath.Split(Path.DirectorySeparatorChar);
                    portraits.Add("Content/Images/Portraits/" + subPathSplit[subPathSplit.Length - 1] + "/" + Path.GetFileName(portrait));
                }
            }

            return new JsonResult()
            {
                JsonRequestBehavior = JsonRequestBehavior.AllowGet,
                Data = portraits
            };
        }

        public JsonResult GetCharacters()
        {
            List<string> chars = CharacterSheets.GetCharacters();
            List<Character> characters = new List<Character>();
            foreach (string characterFile in chars)
            {
                characters.Add(CharacterSheets.LoadCharacter(characterFile));
            }

            return new JsonResult()
            {
                JsonRequestBehavior = JsonRequestBehavior.AllowGet,
                Data = characters
            };
        }

        public JsonResult Save(string fileName)
        {
            Combat.SaveCombat(s_CurrentRow, s_Rows, fileName);
            return new JsonResult()
            {
                JsonRequestBehavior = JsonRequestBehavior.AllowGet,
                Data = true
            };
        }

        public JsonResult Load(string fileName)
        {
            CombatSave saved = Combat.LoadCombat(fileName);
            s_CurrentRow = saved.Current;
            s_Rows = saved.Rows;
            return new JsonResult()
            {
                JsonRequestBehavior = JsonRequestBehavior.AllowGet,
                Data = s_Rows
            };
        }
    }
}