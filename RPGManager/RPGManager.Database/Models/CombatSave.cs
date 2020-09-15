using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RPGManager.Models
{
    public class CombatSave
    {
        public List<CombatRow> Rows { get; set; }

        public CombatRow Current { get; set; }
    }
}
