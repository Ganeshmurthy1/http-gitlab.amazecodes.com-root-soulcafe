using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;

namespace Talent.Objects
{
    public class ToolBarClickProcess
    {
        public String ActionsDocNo;
        public String ProcessName;
        public String DocType;
        public String DocNo;

        public ToolBarClickProcess()
        {
            ActionsDocNo = "";
            ProcessName = "";
            DocType = "";
            DocNo = "";

        }

        public void ProcessActions(DataLayer dlDataLayer)
        {
            StoreProcedure stUsp = new StoreProcedure(ProcessName, dlDataLayer.conn, dlDataLayer.sqlTrans);
            stUsp.AddParameters("@strDocType", DocType);
            stUsp.AddParameters("@strDocNo", DocNo);
            stUsp.AddParameters("@strUserCode", Session["UserLogin"].ToString());
            stUsp.AddParameters("@ActionsDocNo", ActionsDocNo);
            stUsp.ExecuteNonQuery();
            stUsp = null;
            AddSubsequentDetails(dlDataLayer);

        }

        private void AddSubsequentDetails(DataLayer dlDataLayer)
        {
            StoreProcedure stUsp = new StoreProcedure("usp_ActionsSubsequentDetails", dlDataLayer.conn, dlDataLayer.sqlTrans);
            stUsp.AddParameters("@strDocType", DocType);
            stUsp.AddParameters("@strDocNo", DocNo);
            stUsp.AddParameters("@strUserCode", Session["UserLogin"].ToString());
            stUsp.AddParameters("@ActionsDocNo", ActionsDocNo);
            stUsp.AddParameters("@strSystemName", SessionProperties.SystemName);
            stUsp.AddParameters("@strOsUserId", SessionProperties.OSUserId);

            stUsp.ExecuteNonQuery();

        }

        internal DataTable DocumentDetails(DataLayer dlDataLayer)
        {
            DataSet dsDataSet = new DataSet();
            DataTable dtTable = new DataTable();
            StoreProcedure stUsp = new StoreProcedure(ProcessName, dlDataLayer.conn);
            stUsp.AddParameters("@strDocType", DocType);
            stUsp.AddParameters("@strDocNo", DocNo);
            stUsp.AddParameters("@strUserCode", Session["UserLogin"].ToString());
            stUsp.AddParameters("@ProcessDocNo", ActionsDocNo);

            dsDataSet = stUsp.GetUspDataSet();
            dlDataLayer.CloseConnections();

            if (dsDataSet.Tables.Count > 0)
                dtTable = dsDataSet.Tables[0];
            return dtTable;
        }
    }
}
