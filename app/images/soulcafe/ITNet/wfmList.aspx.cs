using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;

public partial class wfmList : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    protected void cmdExecute_Click(object sender, EventArgs e)
    {
        ExecuteQuery();
    }

    private void ExecuteQuery()
    {
        DataLayer dlDataLayer = new DataLayer();
        DataTable dtTable = new DataTable();
        dlDataLayer.StartConnections();
        dtTable = dlDataLayer.GetDataTable("select docno, status, description,expected_date,problem_type,severity,priority,allocatedto,reminder,remarks,desc_about_solution,in_email,cc_list from ticket");
        gvTicket.DataSource = dtTable;
        gvTicket.DataBind();
        dlDataLayer.CloseConnections();
        dlDataLayer.Dispose();
    }

    protected void gvTicket_SelectedIndexChanged(object sender, EventArgs e)
    {
        GridView gvView = (GridView)sender;
        
        if (gvView.SelectedRow != null)
        {
            String strDocNo = gvView.SelectedRow.Cells[1].Text;
            if (!String.IsNullOrEmpty(strDocNo))
            {
                Response.Redirect("wfmMaintanceLog.aspx?" + "DOCNO=" + strDocNo + "&ADDEDIT=EDIT");
            }
        }
    }
    protected void gvTicket_RowDeleting(object sender, GridViewDeleteEventArgs e)
    {
        e.Cancel = false ;
    }
}
