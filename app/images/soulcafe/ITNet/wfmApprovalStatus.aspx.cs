using System;
using System.Data;

public partial class wfmApprovalStatus : System.Web.UI.Page
{
    String strDocType;
    String strDocNo;
    String strHeading;
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Session["UserLogin"] != null)
        {
            Session.LCID = 2057;

            if (Request.QueryString.Count > 0)
            {
                strDocType = Request.QueryString["DT"].ToString();
                strDocNo = Request.QueryString["DN"].ToString();
                strHeading = Request.QueryString["HD"].ToString();
            }
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
        this.Title = strHeading;
        lblStatus.Text = strHeading + " Approval Status for DocNo." + strDocNo;
        ExecuteQuery();
    }

    private void ExecuteQuery()
    {
        DataSet dsDataset = new DataSet();
        DataTable dtTable = new DataTable();
        DataLayer dlDataLayer = new DataLayer();
        dlDataLayer.StartConnections();
        StoreProcedure stProc = new StoreProcedure("usp_ITNET_ApprovalStatus", dlDataLayer.conn);
        stProc.AddParameters("@strDocType", strDocType);
        stProc.AddParameters("@strDocNo", strDocNo );
        stProc.AddParameters("@strUserCode", Session["UserLogin"].ToString());

        dsDataset = stProc.GetUspDataSet();
        dlDataLayer.CloseConnections();
        dtTable = dsDataset.Tables[0];
        gvList.DataSource = dtTable;
        gvList.DataBind();
    }

    protected void cmdHome_Click(object sender, EventArgs e)
    {
        Response.Redirect(PublicMethods.GotoHomePage());

    }
}
