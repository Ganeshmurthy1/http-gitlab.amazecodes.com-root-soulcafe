using System;
using System.Data;

public partial class wfmApproval : System.Web.UI.Page
{
    String strDocType = "";
    String strDocNo = "";
    String strUniqueId = "";
    protected void Page_Load(object sender, EventArgs e)
    {
        Session.LCID = 2057;
        if (Session["UserLogin"] != null )
        {
            if (Request.QueryString.Count > 0)
            {
                strDocType = Request.QueryString["DT"].ToString();
                strDocNo = Request.QueryString["DN"].ToString();
                strUniqueId = Request.QueryString["UID"].ToString();
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
        LoadApprovalList();        
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

    protected void cmdApprove_Click(object sender, EventArgs e)
    {
        if (CheckData())
            ApproveProcess();
    }

    private bool CheckData()
    {
        if (chkFinalApproval.Checked == true)
        {
            if (!String.IsNullOrEmpty(ddlNextApproval.SelectedItem.Text.Trim()))
            {
                PublicMethods.MessageDisplay(cvValidator, "You have selected Final approval checkbox, next approval list should be blank", false);
                return false;
            }
        }
        else
        {
            if (String.IsNullOrEmpty(ddlNextApproval.SelectedItem.Text.Trim()))
            {
                PublicMethods.MessageDisplay(cvValidator, "Select the name from next approval list or select final approval checkbox", false);
                return false;
            }
        }
        return true;
    }

    private void ApproveProcess()
    {
        DataLayer dlDataLayer = new DataLayer();
        String strNewUniqueId = PublicMethods.GetUniqueID();
        try
        {
            dlDataLayer.StartConnections();
            dlDataLayer.BeginTrans();
            StoreProcedure stUsp = new StoreProcedure("usp_ITNET_Approval", dlDataLayer.conn, dlDataLayer.sqlTrans);
            stUsp.AddParameters("@strDocType", strDocType);
            stUsp.AddParameters("@strDocNo", strDocNo);
            stUsp.AddParameters("@strUserCode", Session["UserLogin"].ToString());
            stUsp.AddParameters("@strNextApprUserCode", ddlNextApproval.SelectedValue);
            stUsp.AddParameters("@intFinalApproval", chkFinalApproval.Checked == true ? 1 : 0);
            stUsp.AddParameters("@strSystemName", Session["SystemName"].ToString());
            stUsp.AddParameters("@strOsUserId", Session["OSID"].ToString());
            stUsp.AddParameters("@strUniqueId", strUniqueId);
            stUsp.AddParameters("@strNewUniqueId", strNewUniqueId);
            stUsp.AddParameters("@strRemarks", txtApproveRemarks.Text.Trim());
            stUsp.ExecuteNonQuery();
            dlDataLayer.CommitTrans();
            lblApprovalStatus.Text = "Approval has done successfully";
            String strMailResult = PublicMethods.SendMailForNextApproval(cvValidator, dlDataLayer,
                                                    strDocType, strDocNo, Session["UserLogin"].ToString(),
                                                        Session["Email"].ToString());
            if (!String.IsNullOrEmpty(strMailResult))
                PublicMethods.MessageDisplay(cvValidator, strMailResult, false);
        }
        catch (Exception ex)
        {
            dlDataLayer.RollBackTrans();
            PublicMethods.MessageDisplay(cvValidator, ex.Message, false);
        }
        finally
        {
            dlDataLayer.CloseConnections();
        }
    }

    protected void cmdHome_Click(object sender, EventArgs e)
    {
        Response.Redirect(PublicMethods.GotoHomePage());
    }

    protected void cmdReturnToSender_Click(object sender, EventArgs e)
    {
        if (CheckDataForReturnedToSender())
            ReturnToSender();
    }

    private bool CheckDataForReturnedToSender()
    {
        if (String.IsNullOrEmpty(txtApproveRemarks.Text.Trim().ToString()))
        {
            PublicMethods.MessageDisplay(cvValidator, "Remarks should not be empty", false);
            return false;
        }
        return true;
    }

    private void ReturnToSender()
    {
        DataLayer dlDataLayer = new DataLayer();
        try
        {
            dlDataLayer.StartConnections();
            dlDataLayer.BeginTrans();
            StoreProcedure stUsp = new StoreProcedure("usp_ITNET_ReturnToSender", dlDataLayer.conn, dlDataLayer.sqlTrans);
            stUsp.AddParameters("@strDocType", strDocType);
            stUsp.AddParameters("@strDocNo", strDocNo);
            stUsp.AddParameters("@strUserCode", Session["UserLogin"].ToString());
            stUsp.AddParameters("@strSystemName", Session["SystemName"].ToString());
            stUsp.AddParameters("@strOsUserId", Session["OSID"].ToString());
            stUsp.AddParameters("@strUniqueId", strUniqueId);
            stUsp.AddParameters("@strRemarks", txtApproveRemarks.Text.Trim());
            stUsp.ExecuteNonQuery();
            dlDataLayer.CommitTrans();

            lblApprovalStatus.Text = "Return to sender option has done successfully";
            String strMailResult = PublicMethods.SendMailForNextApproval(cvValidator, dlDataLayer,
                                                    strDocType, strDocNo, Session["UserLogin"].ToString(),
                                                        Session["Email"].ToString());
            if (!String.IsNullOrEmpty(strMailResult))
                PublicMethods.MessageDisplay(cvValidator, strMailResult, false);
        }
        catch (Exception ex)
        {
            dlDataLayer.RollBackTrans();
            PublicMethods.MessageDisplay(cvValidator, ex.Message, false);
        }
        finally
        {
            dlDataLayer.CloseConnections();
        }
    }
}
