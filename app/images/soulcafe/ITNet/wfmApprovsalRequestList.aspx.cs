using System;
using System.Data;
using System.Web.UI.WebControls;

public partial class wfmApprovsalRequestList : System.Web.UI.Page
{
    String strDocType;
    protected void Page_Load(object sender, EventArgs e)
    {

        if (Session["UserLogin"] != null)
        {
            Session.LCID = 2057;
            if (!this.IsPostBack)
            {

                if (Request.QueryString.Count > 0)
                {
                    strDocType = Request.QueryString["DT"].ToString();
                    ViewState["strDocType"] = strDocType;
                }
                ActualFormLoad();
            }
            else
            {
                strDocType = ViewState["strDocType"].ToString();
            }
        }
        else
        {
            Response.Redirect(PublicVariables.HomePage);
        }
    }

    private void ActualFormLoad()
    {
        ExecuteQuery();
    }

    private void ExecuteQuery()
    {
        DataSet dsDataset = new DataSet();
        DataTable dtTable = new DataTable();
        DataLayer dlDataLayer = new DataLayer();
        dlDataLayer.StartConnections();
        StoreProcedure stProc = new StoreProcedure("usp_ITNET_SVR_DisplayData", dlDataLayer.conn);
        stProc.AddParameters("@strDocType", strDocType);
        stProc.AddParameters("@strDocNo", "");
        stProc.AddParameters("@strUserCode", Session["UserLogin"].ToString());
        stProc.AddParameters("@intIsList", 1);

        dsDataset = stProc.GetUspDataSet();
        dlDataLayer.CloseConnections();
        dtTable = dsDataset.Tables[0];
        gvList.DataSource = dtTable;
        gvList.DataBind();
    }

    protected void gvList_SelectedIndexChanged(object sender, EventArgs e)
    {
        GridView gvView = (GridView)sender;
        if (gvView.SelectedRow != null)
        {
            String strDocNo = gvView.SelectedRow.Cells[1].Text;
            if (!String.IsNullOrEmpty(strDocNo))
            {
                Response.Redirect(PublicMethods.GetFormLink(strDocType, strDocNo, "E", "", ""));
            }
        }
    }

    protected void cmdNew_Click(object sender, EventArgs e)
    {
        Response.Redirect(PublicMethods.GetFormLink(strDocType, "", "A", "", ""));
    }

}
