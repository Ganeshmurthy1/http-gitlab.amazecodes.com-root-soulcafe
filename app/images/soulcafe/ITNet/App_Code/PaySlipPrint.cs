using System;
using System.Data;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;

/// <summary>
/// Summary description for PaySlipPrint
/// </summary>
public class PaySlipPrint
{
    DataTable dtTable = new DataTable();


	public PaySlipPrint(String strUserCode)
	{
        DataLayer dlDataLayer = new DataLayer();
        dlDataLayer.StartConnections();
        DataSet dsDataset = new DataSet();
        dlDataLayer.StartConnections();
        StoreProcedure stProc = new StoreProcedure("usp_INTRA_PaySlip", dlDataLayer.conn);
        stProc.AddParameters("@strMonthYear", "052010");

        stProc.AddParameters("@strUserCode", strUserCode); 

        dsDataset = stProc.GetUspDataSet();
        dlDataLayer.CloseConnections();
        dtTable = dsDataset.Tables[0];
    }
}
