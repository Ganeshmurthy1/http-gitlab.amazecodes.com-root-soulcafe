using System;
using System.Data;
using System.Web.UI.WebControls;

public partial class wfmAppReqEmailApproval : System.Web.UI.Page
{
    String strDocType;
    String strDocNo;
    String strUserCode;
    String strEmailOrPage;
    String strUniqueId;


    protected void Page_Load(object sender, EventArgs e)
    {
        Session.LCID = 2057;
        if (Request.QueryString.Count > 0)
        {
            strDocType = Request.QueryString["DT"].ToString();
            strDocNo = Request.QueryString["DN"].ToString();
            strUserCode = Request.QueryString["UR"].ToString();
            strEmailOrPage = Request.QueryString["EP"].ToString();
            strUniqueId = Request.QueryString["UID"].ToString();
            Session["UserLogin"] = strUserCode;
            if (Session["SystemName"] == null)
            {
                Session["SystemName"] = System.Net.Dns.GetHostEntry(Request.ServerVariables["remote_host"]).HostName; // Request.ServerVariables["REMOTE_HOST"].ToString();
                Session["OSID"] = Context.User.Identity.Name;
            }
        }
        if (Session["UserLogin"] != null)
        {
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
        // Initialise Grid Columns to Array for further use 
        PublicVariables.WebPathString = "http://"  + Request.Url.Authority + Request.ApplicationPath.ToString() +"/";

        DisplayData();
        if (strEmailOrPage == "EMAIL")
        {
            hlClickhereforApproval.Visible = true;
        }
        else
        {
            cmdApprove.Visible = true;
            cmdApprovalTracking.Visible = true;
        }
        hlClickhereforApproval.NavigateUrl = PublicVariables.WebPathString +
            "wfmAppReqEmailApproval.aspx?DT=" + strDocType + "&DN=" + strDocNo + "&UR=" + strUserCode + "&EP=PAGE" +
            "&UID=" + strUniqueId;
    }

    private void DisplayData()
    {
        DataSet dsDataset = new DataSet();
        DataTable dtTable = new DataTable();

        DataLayer dlDataLayer = new DataLayer();
        dlDataLayer.StartConnections();

        StoreProcedure stProc = new StoreProcedure("usp_ITNET_APL_Show", dlDataLayer.conn);
        stProc.AddParameters("@strDocType", strDocType);
        stProc.AddParameters("@strDocNo", strDocNo);
        stProc.AddParameters("@strUserCode", strUserCode);
        stProc.AddParameters("strUniqueId", strUniqueId);

        dsDataset = stProc.GetUspDataSet();
        dlDataLayer.CloseConnections();
        if (dsDataset.Tables.Count > 0)
        {
            dtTable = dsDataset.Tables[0];
            PopulateHeaderInformation(dtTable);
            if (strEmailOrPage == "PAGE")
            {
                dtTable = dsDataset.Tables[1];
                PopulateAttchments(dtTable);
            }

            dtTable = dsDataset.Tables[2];
            PopulateSenderDetails(dtTable);

        }
    }

    private void PopulateSenderDetails(DataTable dtTable)
    {
        gvApprovalMatrix.DataSource = dtTable;
        gvApprovalMatrix.DataBind();
        foreach (DataRow dtRow in dtTable.Rows)
        {
            {
                if (strUserCode == dtRow["APPROVED_BY"].ToString() + String.Empty)
                {
                    lbSenderName.Text = dtRow["REQUESTER_NAME"].ToString();
                    if (Session["Email"] == null)
                        Session["Email"] = dtRow["EMAIL"].ToString();
                    if (Session["UserName"] == null)
                        Session["UserName"] = dtRow["APPROVED_NAME"].ToString();
                }
            }
        }
    }

    private void PopulateHeaderInformation(DataTable dtTable)
    {
        if (dtTable.Rows.Count > 0)
        {
            DataRow dtRow = dtTable.Rows[0];

            lblDocNo.Text = dtRow["DOCNO"].ToString();
            lblDocDate.Text = dtRow["DOCDATE"].ToString();
            lblSubject.Text = dtRow["SUBJECT"].ToString();
            ltlDetails.Text = dtRow["DETAILS"].ToString();
        }
    }

    private void PopulateAttchments(DataTable dtTable)
    {
        gvAttachments.DataSource = dtTable;
        gvAttachments.DataBind();
    }

    protected void cmdApprove_Click(object sender, EventArgs e)
    {
        Response.Redirect("wfmApproval.aspx?DT=" + strDocType + "&DN=" + lblDocNo.Text + "&UID=" + strUniqueId );
    }

    protected void cmdApprovalStatus_Click(object sender, EventArgs e)
    {
        Response.Redirect(PublicMethods.ApprovalStatusFormLink(strDocType, strDocNo, this.Title.ToString()));
    }

    protected void gvAttachments_SelectedIndexChanged(object sender, EventArgs e)
    {
        GridView gvView = (GridView)sender;
        if (gvView.SelectedRow != null)
        {
            String strOriginalFile = gvView.SelectedRow.Cells[1].Text;
            String strStoredFileName = gvView.SelectedRow.Cells[2].Text;
            if (!String.IsNullOrEmpty(strDocNo))
            {
                Response.Redirect(PublicMethods.DownLoadFileFormLink(strOriginalFile, strStoredFileName));
            }
        }
    }

    protected void cmdHome_Click(object sender, EventArgs e)
    {
        Response.Redirect(PublicMethods.GotoHomePage());
    }
    protected void cmdApprovalTracking_Click(object sender, EventArgs e)
    {
        Response.Redirect("wfmApprovalTrackingDisplay.aspx?DT=" + strDocType + "&DN=" + lblDocNo.Text);

    }
}