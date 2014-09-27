using System;
using System.Data;

public partial class wfmProcessDocument : System.Web.UI.Page
{
    String strDocType = "";
    String strDocNo = "";
    String strDesignation = "";
    String strAttach = "";

    protected void Page_Load(object sender, EventArgs e)
    {
        if (!String.IsNullOrEmpty(Session["UserLogin"].ToString().Trim()))
        {
            Session.LCID = 2057;
            if (Request.QueryString.Count > 0)
            {
                strDocType = Request.QueryString["DT"].ToString();
                strDocNo = Request.QueryString["DN"].ToString();
                strDesignation = Request.QueryString["DSN"].ToString();
                strAttach = Request.QueryString["ATT"].ToString();
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

    private void LoadApprovalList()
    {
        DataLayer dlDataLayer = new DataLayer();
        DataSet dsDataSet = new DataSet();
        dlDataLayer.StartConnections();
        StoreProcedure stUsp = new StoreProcedure("usp_ITNET_GetEmpDetails", dlDataLayer.conn, dlDataLayer.sqlTrans);
        stUsp.AddParameters("@strDocType", strDocType);
        stUsp.AddParameters("@strDocNo", strDocNo);
        stUsp.AddParameters("@strUserCode", Session["UserLogin"].ToString());
        dsDataSet = stUsp.GetUspDataSet();
        dlDataLayer.CloseConnections();

        if (dsDataSet.Tables.Count > 0)
        {
            ddlNextApproval.DataSource = dsDataSet.Tables[0];
            ddlNextApproval.DataTextField = "NAME";
            ddlNextApproval.DataValueField = "DOCNO";
            ddlNextApproval.DataBind();
        }
    }

    private void ActualFormLoad()
    {
        this.Title = "Process Document";
        if (String.IsNullOrEmpty(strAttach.Trim()))
        {
            cmdAttachments.Visible = false;
        }
        LoadApprovalList();
    }

    protected void cmdProcess_Click(object sender, EventArgs e)
    {
        if (CheckData() == true)
        {
            SaveApprovalNotification();
        }
    }

    private bool CheckData()
    {
        if (String.IsNullOrEmpty(ddlNextApproval.Text.Trim()))
        {
            PublicMethods.MessageDisplay(cvValidator, "Select the name from next approval list", false);
            return false;
        }
        return true;
    }

    private void SaveApprovalNotification()
    {
        Boolean SaveApprovalSucessFully = false;
        DataLayer dlDataLayer = new DataLayer();
        String strUniqueId = PublicMethods.GetUniqueID();
        try
        {
            dlDataLayer.StartConnections();
            dlDataLayer.BeginTrans();
            StoreProcedure stUsp = new StoreProcedure("usp_ITNET_Doc_ProcessAfterSave", dlDataLayer.conn, dlDataLayer.sqlTrans);
            stUsp.AddParameters("@strDocType", strDocType);
            stUsp.AddParameters("@strDocNo", strDocNo);
            stUsp.AddParameters("@strToUserCode", ddlNextApproval.SelectedValue);
            stUsp.AddParameters("@strUserCode", Session["UserLogin"].ToString());
            stUsp.AddParameters("@strUniqueId", strUniqueId);
            stUsp.AddParameters("@intInitiate", 1);
            stUsp.ExecuteNonQuery();
            dlDataLayer.CommitTrans();
            SaveApprovalSucessFully = true;
        }
        catch (Exception ex)
        {
            dlDataLayer.RollBackTrans();
            PublicMethods.MessageDisplay(cvValidator, ex.Message, false);
        }

        // After Save send mail for next approval
        if (SaveApprovalSucessFully)
        {
            String strMailResult = PublicMethods.SendMailForNextApproval(cvValidator,
                                            dlDataLayer, strDocType, strDocNo,
                                            Session["UserLogin"].ToString(), 
                                            Session["Email"].ToString());
            if (!String.IsNullOrEmpty(strMailResult))
                PublicMethods.MessageDisplay(cvValidator, strMailResult, false);
            else
            {
                lblProcessStatus.Text = "Process has completed sucessfully";
                //                Response.Redirect("");
            }
        }
        dlDataLayer.CloseConnections();
    }

    protected void cmdAttachments_Click(object sender, EventArgs e)
    {
        Response.Redirect(PublicMethods.AttachmentFormLink(strDocType, strDocNo));
    }

    protected void cmdBack_Click(object sender, EventArgs e)
    {
        Response.Redirect("PageStart.aspx");
    }
}
