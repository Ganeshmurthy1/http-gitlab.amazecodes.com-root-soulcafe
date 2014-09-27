using System;
using System.Data;
using System.Web.UI.WebControls;

public partial class wfmApprovalList : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Session["UserLogin"] != null)
        {
            Session.LCID = 2057;

            if (!this.IsPostBack)
            {
                ActualFormLoad();
            }
        }
        else
        {
            Response.Redirect(PublicVariables.HomePage);
        }
    }

    private void ActualFormLoad()
    {
        ExecuteQuery("Not Approved");
    }

    private void ExecuteQuery(String strFilter)
    {
        DataSet dsDataset = new DataSet();
        DataTable dtTable = new DataTable();
        DataLayer dlDataLayer = new DataLayer();
        dlDataLayer.StartConnections();
        StoreProcedure stProc = new StoreProcedure("usp_ITNET_DisplayDataForApproval", dlDataLayer.conn);
        stProc.AddParameters("@strUserCode", Session["UserLogin"].ToString());
        stProc.AddParameters("@strFilter", strFilter);

        dsDataset = stProc.GetUspDataSet();
        dlDataLayer.CloseConnections();
        dtTable = dsDataset.Tables[0];
        gvList.DataSource = dtTable;
        gvList.DataBind();
    }

    protected void cmdExecute_Click(object sender, EventArgs e)
    {
        if (!String.IsNullOrEmpty(cmbFilter.Text))
            ExecuteQuery(cmbFilter.Text);
        else
            PublicMethods.MessageDisplay(cvValidator,"Filter should not be empty", false);   
    }
    
    protected void gvList_SelectedIndexChanged(object sender, EventArgs e)
    {
        GridView gvView = (GridView)sender;
        if (gvView.SelectedRow != null)
        {
            String strDocType = gvView.SelectedRow.Cells[1].Text;
            String strDocNo = gvView.SelectedRow.Cells[3].Text;
            String strUniqueId = gvView.SelectedRow.Cells[6].Text;
            if (!String.IsNullOrEmpty(strDocNo) && !String.IsNullOrEmpty(strDocType))
            {
                Response.Redirect(PublicMethods.ApprovePage(strDocType, strDocNo, Session["UserLogin"].ToString(),"PAGE", strUniqueId));
            }
        }
    }

    protected void cmdHome_Click(object sender, EventArgs e)
    {
        Response.Redirect(PublicMethods.GotoHomePage());

    }
}
