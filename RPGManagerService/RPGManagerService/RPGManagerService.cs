using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.ServiceProcess;
using System.Text;
using System.Threading.Tasks;

using Microsoft.AspNet.SignalR;
using Microsoft.Owin.Hosting;
using Owin;
using Microsoft.Owin.Cors;



namespace RPGManagerService
{
    public partial class RPGManagerService : ServiceBase
    {
        public RPGManagerService()
        {
            InitializeComponent();
        }

        protected override void OnStart(string[] args)
        {
            WebApp.Start("http://*/RPGManagerService");
        }

        protected override void OnStop()
        {
        }
    }
}
