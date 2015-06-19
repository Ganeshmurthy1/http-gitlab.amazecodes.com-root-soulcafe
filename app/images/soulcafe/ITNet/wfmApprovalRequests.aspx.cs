using System;
using System.Data;
using System.Web.UI.WebControls;
using System.Data.SqlClient;

public partial class wfmApprovalRequests : System.Web.UI.Page
{
    String strDocType;
    String strDocNo;
    String strAddEditDeleteStatus;

//    String strNavigateUrl;

    protected void Page_Load(object sender, EventArgs e)
    {
        //if (Session["UserLogin"] != null)
        //{
            Session.LCID = 2057;
            if (Request.QueryString.Count > 0)
            {
                strDocType = Request.QueryString["DT"].ToString();
                strDocNo = Request.QueryString["DN"].ToString();
                strAddEditDeleteStatus = Request.QueryString["AED"].ToString();
                ActualFormLoad();
            }
            

        //}
        //else
        //{
        //    Response.Redirect(PublicVariables.HomePage);
        //}
    }

    private void ActualFormLoad()
    {
        // Initialise Grid Columns to Array for further use 
        this.Title = "Approval Requests";
        lblDocDate.Text = DateTime.Today.ToString();
        DisplayData();
        DocumentalisedForm();

        //***
        //this.ToolBarPopulate(this, tbNavigator, objDocProperties, txtDocNo.Text);

        if (strAddEditDeleteStatus == "E")
        {
            tsbEdit_Click();
        }
        else if (strAddEditDeleteStatus == "SH")
        {
            DisplayControls();
        }
        else if (strAddEditDeleteStatus == "A")
        {
            tsbAdd_Click();
        }
        // this.AssignTextToTag(this.Controls);
    }

    private void DisplayData()
    {
        if (strAddEditDeleteStatus != "A")
        {
            DataSet dsDataset = new DataSet();
            DataTable dtTable = new DataTable();

            DataLayer dlDataLayer = new DataLayer();
            dlDataLayer.StartConnections();

            StoreProcedure stProc = new StoreProcedure("usp_ITNET_APL_DisplayData", dlDataLayer.conn);
            stProc.AddParameters("@strDocType", strDocType);
            stProc.AddParameters("@strDocNo", strDocNo);
            stProc.AddParameters("@strUserCode", Session["UserLogin"].ToString());
            stProc.AddParameters("@intIsList", 0);

            dsDataset = stProc.GetUspDataSet();
            dlDataLayer.CloseConnections();

            if (dsDataset.Tables.Count > 0)
            {
                dtTable = dsDataset.Tables[0];
                PopulateHeaderInformation(dtTable);

                dtTable = dsDataset.Tables[1];
                PopulateAttchments(dtTable);

                dtTable = dsDataset.Tables[2];
                ValidateUserInformation(dtTable);


            }
        }
    }

    private void PopulateAttchments(DataTable dtTable)
    {
        gvAttachments.DataSource = dtTable;
        gvAttachments.DataBind();
    }

    private void ValidateUserInformation(DataTable dtTable)
    {
        if (dtTable.Rows.Count > 0)
        {
            DataRow dtRow = dtTable.Rows[0];
            int ValidUser = PublicMethods.ToInt16(dtRow["VALIDUSER"]);
            switch (ValidUser)
            {
                case 1:  // Edit and Save
                    cmdSave.Visible = true;
                    cmdDelete.Visible = strAddEditDeleteStatus == "E" ? true : false ;
                    cmdApprovalStatus.Visible = false;
                    break;
                case 2:  // Allow View
                    cmdApprovalStatus.Visible = true;
                    cmdSave.Visible = false;
                    cmdDelete.Visible = false;
                    break;
            }
        }
    }

    private void PopulateHeaderInformation(DataTable dtTable)
    {
        if (dtTable.Rows.Count > 0)
        {
            DataRow dtRow = dtTable.Rows[0];
            txtDocNo.Text = dtRow["DOCNO"].ToString();
            lblDocDate.Text = dtRow["DOCDATE"].ToString();
            txtSubject.Text = dtRow["SUBJECT"].ToString();
            txtDetails.Text = dtRow["DETAILS"].ToString();
        }
    }

    private void tsbAdd_Click()
    {
        strAddEditDeleteStatus = "A";
        //        base.ClearControls(this.Controls);
        //        EditModeActive();
        lblDocDate.Text = DateTime.Today.ToString();
        txtDocNo.Text = PublicMethods.GetLastDocNo(strDocType, Session["UserLogin"].ToString());
        //        base.AssignTextToTag(this.Controls);

        txtDocNo.Focus();
    }

    public void tsbEdit_Click()
    {
        strAddEditDeleteStatus = "E";
        //        EditModeActive();
        txtDocNo.ReadOnly = true;
        //        this.AssignTextToTag(this.Controls);
        //        dtpDocDate.Focus();
    }

    void EditModeActive()
    {
        //        this.LockControls(this.Controls, false);
        //        GridAddDelete(true);
        //        cmdCancelApprove.Enabled = true;
        //        tsbAdd.Enabled = false;
        //        tsbEdit.Enabled = false;
        //        tsbDelete.Enabled = false;
    }


    void DisplayControls()
    {
        //        base.LockControls(this.Controls, true);
        //        cmdCancelApprove.Enabled = false;
        cmdSave.Visible = false;
        cmdDelete.Visible = false;
        //        GridAddDelete(false); ;
    }

    private void DocumentalisedForm()
    {
        //        this.Text = objDocProperties.Description;
        //      this.lblDocDate.Text = objDocProperties.DocType + " Date";
        //        this.lblDocNo.Text = objDocProperties.DocType + " No";
    }

    private void TransactionSave()
    {
        if (Session["UserLogin"] != null)
        {
            bool SaveSuccessFully = false;
            if (CheckData() == true)
            {
                String dtCurrentDateTime = PublicMethods.QueryDateTime(PublicMethods.GetServerDateTime());
                DataLayer dlDataLayer = new DataLayer();
                try
                {
                    dlDataLayer.StartConnections();
                    dlDataLayer.BeginTrans();

                    CheckSentForApproval(dlDataLayer);
                    if (strAddEditDeleteStatus == "E")
                    {
                        DeleteAll(dlDataLayer, dtCurrentDateTime);
                    }
                    SaveAll(dlDataLayer, dtCurrentDateTime);
                    PublicMethods.SaveAddEditDeleteStatus(txtDocNo.Text, strDocType, 
                        PublicMethods.GetAddEditDeleteDisplayEnum(strAddEditDeleteStatus), dlDataLayer,
                        dtCurrentDateTime, Session["UserLogin"].ToString(), 
                        Session["SystemName"].ToString(), Session["OSID"].ToString());
                    if (strAddEditDeleteStatus == "A")
                    {
                        PublicMethods.UpdateLastDocNo(strDocType, txtDocNo.Text, dlDataLayer, Session["UserLogin"].ToString());
                    }
                    dlDataLayer.CommitTrans();
                    SaveSuccessFully = true;
                    PublicMethods.MessageDisplay(cvValidator, "Document has Saved Successfully ", true);
                }
                catch (SqlException ex)
                {
                    dlDataLayer.RollBackTrans();
                    if (ex.Message.Contains("PRIMARY KEY constraint 'PK_" + "ITNET_APPROVAL_REQUESTS" + "'") == true)
                    {
                        PublicMethods.MessageDisplay(cvValidator, strDocType  + " " + this.txtDocNo.Text + " has already saved, do want you save as new document", false);
                    }
                    else
                        PublicMethods.MessageDisplay(cvValidator, ex.Message, false);
                }
                catch (Exception ex)
                {
                    dlDataLayer.RollBackTrans();
                    PublicMethods.MessageDisplay(cvValidator, ex.Message, false);
                }
                if (SaveSuccessFully)
                {
                    //*
                    cmdSave.Enabled = false;
                    cmdDelete.Visible = false;
                    Response.Redirect(PublicMethods.ProcessFormLink(strDocType, txtDocNo.Text, "", "YES"));

//                    Response.Redirect("wfmProcessDocument.aspx?DT=" + strDocType + "&DN=" + txtDocNo.Text +
//                                            "&DSN=" + strDesignation);
                    //if (objDocProperties.AutoAddNewDocument == true && strAddEditDeleteStatus == "A")
                    //{
                    //    //ClearControls();    
                    //    tsbAdd_Click();
                    //    txtDocNo.Focus();
                    //}
                    //else
                    //{
                    //    strAddEditDeleteStatus = "SH";
                    //    //***
                    //    //                    this.ToolBarPopulate(this, tbNavigator, objDocProperties, txtDocNo.Text);
                    //    DisplayControls();
                    //}
                }
            }
        }
        else
        {
            Response.Redirect(PublicVariables.HomePage);
        }
    }

    private void CheckSentForApproval(DataLayer dlDataLayer)
    {
        StoreProcedure stUsp = new StoreProcedure("usp_ITNET_BlockSavingAfterProcess", dlDataLayer.conn, dlDataLayer.sqlTrans);
        stUsp.AddParameters("@strDocType", strDocType);
        stUsp.AddParameters("@strDocNo", txtDocNo.Text);
        stUsp.AddParameters("@strUserCode", Session["UserLogin"].ToString());
        stUsp.ExecuteNonQuery();
    }

    private bool CheckData()
    {
        if (String.IsNullOrEmpty(txtDocNo.Text.Trim()))
        {
            PublicMethods.MessageDisplay(cvValidator, "Doc No should not be empty", false);

            if (txtDocNo.Enabled || txtDocNo.Visible)
                txtDocNo.Focus();
            return false;
        }
        return true;
    }

    private void SaveAll(DataLayer dlDataLayer, String dtCurrentDateTime)
    {
        String strSqlString = "";
        SqlObject sqlObj = new SqlObject();

        sqlObj.TableName = "ITNET_APPROVAL_REQUESTS";
        if (strAddEditDeleteStatus == "A")
        {
            sqlObj.QueryType = PublicVariables.QueryType.Insert;
            PublicMethods.AddCreatedBYandTS(sqlObj, dtCurrentDateTime, Session["UserLogin"].ToString());
        }
        else
        {
            sqlObj.QueryType = PublicVariables.QueryType.Update;
            sqlObj.WhereCondition = " DOCTYPE = '" + strDocType  + "' AND DOCNO = '" + txtDocNo.Text + "'";
        }


        sqlObj.AddColumns("DOCTYPE", strDocType, PublicVariables.DataType.Text);
        sqlObj.AddColumns("DOCNO", txtDocNo.Text.Trim(), PublicVariables.DataType.Text);
        sqlObj.AddColumns("DOCDATE", PublicMethods.QueryDateTime(lblDocDate.Text), PublicVariables.DataType.Date);

        sqlObj.AddColumns("SUBJECT", txtSubject.Text, PublicVariables.DataType.Text);
        sqlObj.AddColumns("DETAILS", txtDetails.Text, PublicVariables.DataType.Text);

        strSqlString = sqlObj.getSQlString();
        dlDataLayer.InsertDataTrans(strSqlString);
    }

    private void DeleteAll(DataLayer dlDataLayer, String dtCurrentDateTime)
    {
        SqlObject sqlObj = new SqlObject();
        String strHeaderSQLString = "";

        String strDetailSQLString = "";
        if (strAddEditDeleteStatus == "DEL")
        {
            PublicMethods.SaveAddEditDeleteStatus(txtDocNo.Text, strDocType , 
                PublicMethods.GetAddEditDeleteDisplayEnum(strAddEditDeleteStatus), 
                dlDataLayer,  dtCurrentDateTime,
                Session["UserLogin"].ToString(), Session["SystemName"].ToString(), Session["OSID"].ToString());
            sqlObj.TableName = "ITNET_APPROVAL_REQUESTS";
            sqlObj.QueryType = PublicVariables.QueryType.Delete;
            sqlObj.WhereCondition = " DOCTYPE = '" + strDocType  + "' AND  DOCNO = '" + txtDocNo.Text + "'";
            strHeaderSQLString = sqlObj.getSQlString();
            dlDataLayer.DeleteDataTrans(strHeaderSQLString);
            PublicMethods.ApprovedDocumentNotDelete(strDocType, strDocNo, Session["UserLogin"].ToString(), dlDataLayer);
        }

        ////
        sqlObj = null;
        sqlObj = new SqlObject();
        sqlObj.TableName = "ITNET_APPROVAL_DETAILS";
        sqlObj.QueryType = PublicVariables.QueryType.Delete;
        sqlObj.WhereCondition = " DOCTYPE = '" + strDocType  + "' AND  DOCNO = '" + txtDocNo.Text + "'";
        strDetailSQLString = sqlObj.getSQlString();
        dlDataLayer.DeleteDataTrans(strDetailSQLString);
    }


    private void DeleteData()
    {
        strAddEditDeleteStatus = "DEL";
        String dtCurrentDateTime = PublicMethods.QueryDateTime(PublicMethods.GetServerDateTime());
        bool DeleteSuccessFully = false;

        DataLayer dlDataLayer = new DataLayer();
        try
        {
            dlDataLayer.StartConnections();
            dlDataLayer.BeginTrans();
            DeleteAll(dlDataLayer, dtCurrentDateTime);
            PublicMethods.DeleteAttachmentsTableEntryAndFiles(strDocType, strDocNo, dlDataLayer);
            dlDataLayer.CommitTrans();
            PublicMethods.MessageDisplay(cvValidator, "Document has successfully deleted", true);
            PublicMethods.DeletePhysicalFile(strDocType, strDocNo, Server.MapPath(""));
            DeleteSuccessFully = true;
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
        dlDataLayer.Dispose();
        strAddEditDeleteStatus = "SH";

        if (DeleteSuccessFully)
            CloseForm();
    }

    private void CloseForm()
    {
        //this.Dispose();
    }

    protected void cmdSave_Click(object sender, EventArgs e)
    {
        TransactionSave();
    }

    protected void cmdDelete_Click(object sender, EventArgs e)
    {
        DeleteData();
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
    protected void Button1_Click(object sender, EventArgs e)
    {
        Response.Redirect("http://localhost:1177/ITNet/wfmAppReqEmailApproval.aspx?DT=APL&DN=21&UR=975");

    }
}
