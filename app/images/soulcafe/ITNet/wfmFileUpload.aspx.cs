using System;
using System.Web;

public partial class wfmFileUpload : System.Web.UI.Page
{
    String strDocType;
    String strDocNo;

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
                    strDocNo = Request.QueryString["DN"].ToString();
                    ViewState["strDocNo"] = strDocNo;
                    ViewState["strDocType"] = strDocType;
                    ActualFormLoad();
                }
            }
            else
            {
                strDocNo = ViewState["strDocNo"].ToString();
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

    }

    protected void cmdAttach_Click(object sender, EventArgs e)
    {
        FileUpLoadForHRA();
    }

    private void FileUpLoadForHRA()
    {
        string filepath = Server.MapPath("");
        String strNewFileName = "";
        HttpFileCollection uploadedFiles = Request.Files;

        DeleteAttachments();
        
        for (int i = 0; i < uploadedFiles.Count; i++)
        {
            HttpPostedFile userPostedFile = uploadedFiles[i];
            try
            {
                if (userPostedFile.ContentLength > 0)
                {
                    lblStatus.Text += "<u>File #" + (i + 1) +
                       "</u><br>";
                    lblStatus.Text += "File Content Type: " +
                       userPostedFile.ContentType + "<br>";
                    lblStatus.Text += "File Size: " +
                       userPostedFile.ContentLength + "kb<br>";
                    lblStatus.Text += "File Name: " +
                       userPostedFile.FileName + "<br>";
                    strNewFileName = strDocType + strDocNo.Trim() + "_" + i.ToString().Trim() + "." + System.IO.Path.GetExtension(userPostedFile.FileName); ;
                    userPostedFile.SaveAs(filepath + "\\Uploads\\" + strNewFileName);

                    //                       System.IO.Path.GetFileName(userPostedFile.FileName));
                    SaveAttachDetailsToTable(strNewFileName, System.IO.Path.GetFileName(userPostedFile.FileName));

                    lblStatus.Text += "Location where saved: " +
                       filepath + "\\Uploads\\" +
                       System.IO.Path.GetFileName(userPostedFile.FileName) +
                       "<p>";
                }
            }
            catch (Exception Ex)
            {
                lblStatus.Text += "Error: <br>" + Ex.Message;
            }
        }
    }


    private void SaveAttachDetailsToTable(String strNewFileName, String strUploadedFileName)
    {
        DataLayer dlDataLayer = new DataLayer();

        String strSqlString = "";
        SqlObject sqlObj = new SqlObject();

        sqlObj.TableName = "ITNET_ATTACHMENTS";
        sqlObj.QueryType = PublicVariables.QueryType.Insert;

        sqlObj.AddColumns("DOCTYPE", strDocType, PublicVariables.DataType.Text);
        sqlObj.AddColumns("DOCNO", strDocNo, PublicVariables.DataType.Text);
        sqlObj.AddColumns("ORIGINAL_FILENAME", strUploadedFileName, PublicVariables.DataType.Text);
        sqlObj.AddColumns("STORED_NAME", strNewFileName, PublicVariables.DataType.Text);

        strSqlString = sqlObj.getSQlString();
        dlDataLayer.StartConnections();
        try
        {
            dlDataLayer.BeginTrans();
            dlDataLayer.InsertDataTrans(strSqlString);
            dlDataLayer.CommitTrans();
        }
        catch (Exception ex)
        {
            PublicMethods.MessageDisplay(cvValidator, ex.Message, false);
            dlDataLayer.RollBackTrans();
        }
        dlDataLayer.CloseConnections();
    }



    protected void cmdDeleteExistingAttach_Click(object sender, EventArgs e)
    {
        DeleteAttachments();
    }

    private void DeleteAttachments()
    {
        DataLayer dlDataLayer = new DataLayer();
        dlDataLayer.StartConnections();
        try
        {
            dlDataLayer.BeginTrans();
            PublicMethods.DeleteAttachmentsTableEntryAndFiles (strDocType, strDocNo, dlDataLayer);
            dlDataLayer.CommitTrans();
            PublicMethods.DeletePhysicalFile(strDocType, strDocNo, Server.MapPath("").ToString());
        }
        catch (Exception ex)
        {
            PublicMethods.MessageDisplay(cvValidator, ex.Message, false);
            dlDataLayer.RollBackTrans();
        }
        dlDataLayer.CloseConnections();

    }

    protected void cmdHome_Click(object sender, EventArgs e)
    {
        Response.Redirect(PublicMethods.GotoHomePage());

    }
}
